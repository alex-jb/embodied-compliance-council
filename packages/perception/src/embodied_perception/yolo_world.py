"""Open-vocabulary object detection (YOLO-World).

Real adapter pulls ultralytics + ~50MB weights; only loaded when the user installs
the `yolo_world` extra. The Mock provider returns deterministic detections so
downstream packages (scene_grounder, ECC trading-quest) can integrate today.
"""
from __future__ import annotations

from typing import List, Protocol, Sequence

import numpy as np

from .types import BoundingBox, Detection


class YoloWorldProvider(Protocol):
    def detect(self, frame: np.ndarray, prompts: Sequence[str]) -> List[Detection]:
        ...


class MockYoloWorld:
    """Deterministic mock — produces one detection per prompt at a fixed grid location."""

    def __init__(self, confidence: float = 0.87) -> None:
        if not 0.0 <= confidence <= 1.0:
            raise ValueError("confidence must be in [0, 1]")
        self._confidence = confidence

    def detect(self, frame: np.ndarray, prompts: Sequence[str]) -> List[Detection]:
        if frame.ndim != 3 or frame.shape[2] not in (3, 4):
            raise ValueError(f"frame must be HxWx3 or HxWx4; got {frame.shape}")
        h, w = frame.shape[:2]
        out: List[Detection] = []
        for i, prompt in enumerate(prompts):
            cell_w = w / max(1, len(prompts))
            x_min = i * cell_w + cell_w * 0.15
            x_max = (i + 1) * cell_w - cell_w * 0.15
            y_min = h * 0.30
            y_max = h * 0.70
            out.append(
                Detection(
                    label=prompt,
                    confidence=self._confidence,
                    box=BoundingBox(x_min=x_min, y_min=y_min, x_max=x_max, y_max=y_max),
                )
            )
        return out
