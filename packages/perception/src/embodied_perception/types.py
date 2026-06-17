from __future__ import annotations

from typing import List, Tuple

import numpy as np
from pydantic import BaseModel, ConfigDict, Field


class BoundingBox(BaseModel):
    """Pixel-space axis-aligned bounding box."""
    model_config = ConfigDict(frozen=True)

    x_min: float = Field(ge=0.0)
    y_min: float = Field(ge=0.0)
    x_max: float
    y_max: float

    def area_px(self) -> float:
        return max(0.0, self.x_max - self.x_min) * max(0.0, self.y_max - self.y_min)


class Detection(BaseModel):
    """One open-vocabulary detection from YOLO-World."""
    model_config = ConfigDict(frozen=True)

    label: str
    confidence: float = Field(ge=0.0, le=1.0)
    box: BoundingBox


class Mask(BaseModel):
    """SAM2 promptable segmentation mask, encoded as RLE for transport."""
    model_config = ConfigDict(frozen=True, arbitrary_types_allowed=True)

    width: int = Field(gt=0)
    height: int = Field(gt=0)
    rle_counts: List[int] = Field(description="COCO-style RLE row-major counts.")

    def pixel_count(self) -> int:
        return sum(self.rle_counts[1::2])


class DepthMap(BaseModel):
    """Depth Anything V2 monocular depth, normalized [0, 1]; 0 = near, 1 = far."""
    model_config = ConfigDict(frozen=True, arbitrary_types_allowed=True)

    width: int = Field(gt=0)
    height: int = Field(gt=0)
    depth: np.ndarray

    def median_depth(self, box: BoundingBox) -> float:
        x0 = int(max(0, box.x_min))
        y0 = int(max(0, box.y_min))
        x1 = int(min(self.width, box.x_max))
        y1 = int(min(self.height, box.y_max))
        if x1 <= x0 or y1 <= y0:
            return 0.0
        return float(np.median(self.depth[y0:y1, x0:x1]))


class SceneObject(BaseModel):
    """One grounded perceptual object: detection + mask + estimated depth + 3D position."""
    model_config = ConfigDict(frozen=True)

    detection: Detection
    mask: Mask
    median_depth: float = Field(ge=0.0, le=1.0)
    position_xyz_m: Tuple[float, float, float] = Field(
        description="Three.js-coords position estimate in meters. y=floor, +z=camera-away."
    )


class PerceptionResult(BaseModel):
    """Output of one frame's perception pass."""
    model_config = ConfigDict(frozen=True)

    objects: List[SceneObject]
    frame_width: int
    frame_height: int
