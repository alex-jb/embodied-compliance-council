"""Perception primitives for the Embodied Compliance Council XR layer.

Three primitives map to the proposal-v2 Perception Layer:
- open-vocabulary object detection (YOLO-World)
- promptable segmentation (SAM2)
- monocular depth estimation (Depth Anything V2)

Each ships as a Provider protocol + a deterministic MockProvider. Real model
adapters live under optional-dependency extras so the package installs without
pulling GB of weights for everyone who only needs the type contract.
"""
from .types import (
    BoundingBox,
    DepthMap,
    Detection,
    Mask,
    PerceptionResult,
    SceneObject,
)
from .yolo_world import YoloWorldProvider, MockYoloWorld
from .sam2 import Sam2Provider, MockSam2
from .depth_anything import DepthAnythingProvider, MockDepthAnything
from .scene_grounder import SceneGrounder, ground_scene

__all__ = [
    "BoundingBox",
    "DepthMap",
    "Detection",
    "Mask",
    "PerceptionResult",
    "SceneObject",
    "YoloWorldProvider",
    "MockYoloWorld",
    "Sam2Provider",
    "MockSam2",
    "DepthAnythingProvider",
    "MockDepthAnything",
    "SceneGrounder",
    "ground_scene",
]
