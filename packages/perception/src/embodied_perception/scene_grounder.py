"""Combines detection + segmentation + depth into a PerceptionResult.

This is the integration point: the ECC trading-quest / Orallexa-XR scene
consumes `PerceptionResult.objects` and decides where to spawn voice podiums,
risk-panel anchors, and decision indicators in 3D space.
"""
from __future__ import annotations

from typing import List, Sequence

import numpy as np

from .depth_anything import DepthAnythingProvider
from .sam2 import Sam2Provider
from .types import PerceptionResult, SceneObject
from .yolo_world import YoloWorldProvider


class SceneGrounder:
    def __init__(
        self,
        detector: YoloWorldProvider,
        segmenter: Sam2Provider,
        depth_estimator: DepthAnythingProvider,
        camera_fov_deg: float = 60.0,
    ) -> None:
        if not 1.0 < camera_fov_deg < 179.0:
            raise ValueError("camera_fov_deg must be in (1, 179)")
        self._detector = detector
        self._segmenter = segmenter
        self._depth_estimator = depth_estimator
        self._fov_rad = float(np.deg2rad(camera_fov_deg))

    def run(self, frame: np.ndarray, prompts: Sequence[str]) -> PerceptionResult:
        h, w = frame.shape[:2]
        depth_map = self._depth_estimator.estimate(frame)
        detections = self._detector.detect(frame, prompts)
        objects: List[SceneObject] = []
        for det in detections:
            mask = self._segmenter.segment_from_box(frame, det.box)
            d_norm = depth_map.median_depth(det.box)
            position = self._project_to_three_js(det.box, d_norm, w, h)
            objects.append(
                SceneObject(detection=det, mask=mask, median_depth=d_norm, position_xyz_m=position)
            )
        return PerceptionResult(objects=objects, frame_width=w, frame_height=h)

    def _project_to_three_js(
        self, box, depth_norm: float, w: int, h: int
    ) -> tuple[float, float, float]:
        """Pixel-box + normalized depth → Three.js-coords meters (camera at origin, +z behind, +y up)."""
        cx = (box.x_min + box.x_max) * 0.5
        cy = (box.y_min + box.y_max) * 0.5
        ndc_x = (cx / w) * 2.0 - 1.0
        ndc_y = -((cy / h) * 2.0 - 1.0)
        depth_m = 1.0 + 6.0 * float(depth_norm)
        half_w_at_depth = depth_m * np.tan(self._fov_rad * 0.5)
        aspect = w / h
        x = ndc_x * half_w_at_depth * aspect
        y = ndc_y * half_w_at_depth + 1.6
        z = -depth_m
        return (float(x), float(y), float(z))


def ground_scene(
    frame: np.ndarray,
    prompts: Sequence[str],
    *,
    detector: YoloWorldProvider | None = None,
    segmenter: Sam2Provider | None = None,
    depth_estimator: DepthAnythingProvider | None = None,
) -> PerceptionResult:
    """Convenience entry that wires mock providers when not supplied."""
    from .depth_anything import MockDepthAnything
    from .sam2 import MockSam2
    from .yolo_world import MockYoloWorld

    grounder = SceneGrounder(
        detector=detector or MockYoloWorld(),
        segmenter=segmenter or MockSam2(),
        depth_estimator=depth_estimator or MockDepthAnything(),
    )
    return grounder.run(frame, prompts)
