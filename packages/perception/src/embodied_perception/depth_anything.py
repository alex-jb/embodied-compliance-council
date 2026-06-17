"""Monocular depth estimation (Depth Anything V2).

Real adapter loads HF transformers + ViT-S/B/L weights. The Mock returns a
deterministic horizontal gradient (closer at the top of the frame, farther
at the bottom) — good enough to drive scene-grounder layout decisions in tests.
"""
from __future__ import annotations

from typing import Protocol

import numpy as np

from .types import DepthMap


class DepthAnythingProvider(Protocol):
    def estimate(self, frame: np.ndarray) -> DepthMap:
        ...


class MockDepthAnything:
    def estimate(self, frame: np.ndarray) -> DepthMap:
        if frame.ndim != 3 or frame.shape[2] not in (3, 4):
            raise ValueError(f"frame must be HxWx3 or HxWx4; got {frame.shape}")
        h, w = frame.shape[:2]
        gradient = np.tile(np.linspace(0.2, 0.9, h, dtype=np.float32).reshape(h, 1), (1, w))
        return DepthMap(width=w, height=h, depth=gradient)
