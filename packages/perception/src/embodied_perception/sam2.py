"""Promptable segmentation (SAM2).

Real adapter requires torch + SAM2 weights. The Mock returns a rectangle-fill
mask matching the input bounding box.
"""
from __future__ import annotations

from typing import List, Protocol

import numpy as np

from .types import BoundingBox, Mask


class Sam2Provider(Protocol):
    def segment_from_box(self, frame: np.ndarray, box: BoundingBox) -> Mask:
        ...


class MockSam2:
    def segment_from_box(self, frame: np.ndarray, box: BoundingBox) -> Mask:
        if frame.ndim != 3 or frame.shape[2] not in (3, 4):
            raise ValueError(f"frame must be HxWx3 or HxWx4; got {frame.shape}")
        h, w = frame.shape[:2]
        rle = _rect_to_rle(box, w, h)
        return Mask(width=w, height=h, rle_counts=rle)


def _rect_to_rle(box: BoundingBox, width: int, height: int) -> List[int]:
    """COCO-style row-major RLE for a filled rectangle."""
    x0 = int(max(0, min(width, box.x_min)))
    x1 = int(max(0, min(width, box.x_max)))
    y0 = int(max(0, min(height, box.y_min)))
    y1 = int(max(0, min(height, box.y_max)))
    if x1 <= x0 or y1 <= y0:
        return [width * height]

    counts: List[int] = []
    current_value = 0
    run = 0
    for y in range(height):
        for x in range(width):
            inside = y0 <= y < y1 and x0 <= x < x1
            value = 1 if inside else 0
            if value == current_value:
                run += 1
            else:
                counts.append(run)
                current_value = value
                run = 1
    counts.append(run)
    return counts
