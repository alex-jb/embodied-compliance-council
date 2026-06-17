from __future__ import annotations

import numpy as np
import pytest

from embodied_perception import (
    BoundingBox,
    MockDepthAnything,
    MockSam2,
    MockYoloWorld,
    PerceptionResult,
    SceneGrounder,
    ground_scene,
)


@pytest.fixture
def frame() -> np.ndarray:
    return np.zeros((480, 640, 3), dtype=np.uint8)


def test_yolo_world_mock_returns_one_detection_per_prompt(frame: np.ndarray) -> None:
    det = MockYoloWorld()
    prompts = ["loan applicant document", "credit card", "compliance binder"]
    result = det.detect(frame, prompts)
    assert len(result) == 3
    assert [d.label for d in result] == prompts
    for d in result:
        assert 0.0 < d.confidence <= 1.0
        assert d.box.area_px() > 0.0


def test_yolo_world_mock_rejects_bad_frame_shape() -> None:
    det = MockYoloWorld()
    with pytest.raises(ValueError):
        det.detect(np.zeros((10, 10), dtype=np.uint8), ["x"])


def test_sam2_mock_returns_mask_with_correct_pixel_count(frame: np.ndarray) -> None:
    seg = MockSam2()
    box = BoundingBox(x_min=100, y_min=100, x_max=200, y_max=200)
    mask = seg.segment_from_box(frame, box)
    assert mask.width == 640
    assert mask.height == 480
    assert mask.pixel_count() == 100 * 100


def test_depth_anything_mock_returns_normalized_gradient(frame: np.ndarray) -> None:
    depth = MockDepthAnything().estimate(frame)
    assert depth.width == 640
    assert depth.height == 480
    assert depth.depth.min() == pytest.approx(0.2, abs=1e-3)
    assert depth.depth.max() == pytest.approx(0.9, abs=1e-3)


def test_scene_grounder_produces_one_object_per_prompt(frame: np.ndarray) -> None:
    grounder = SceneGrounder(
        detector=MockYoloWorld(),
        segmenter=MockSam2(),
        depth_estimator=MockDepthAnything(),
    )
    result: PerceptionResult = grounder.run(frame, ["loan document", "ID card"])
    assert len(result.objects) == 2
    assert result.frame_width == 640
    assert result.frame_height == 480
    for obj in result.objects:
        assert obj.median_depth >= 0.0
        x, y, z = obj.position_xyz_m
        assert z < 0.0, "Three.js camera looks down -z; detected objects must be in front"
        assert 1.0 < y < 2.5, "y should land near eye-level once added to camera height"


def test_scene_grounder_rejects_invalid_fov() -> None:
    with pytest.raises(ValueError):
        SceneGrounder(
            detector=MockYoloWorld(),
            segmenter=MockSam2(),
            depth_estimator=MockDepthAnything(),
            camera_fov_deg=200.0,
        )


def test_ground_scene_convenience_wires_all_mocks(frame: np.ndarray) -> None:
    result = ground_scene(frame, ["compliance form", "signature page"])
    assert len(result.objects) == 2
    assert all(o.detection.confidence > 0.0 for o in result.objects)
