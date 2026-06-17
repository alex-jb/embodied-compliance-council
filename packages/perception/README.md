# embodied-perception

Perception primitives for the Embodied Compliance Council XR scope. Implements the Perception Layer in Loredana Levitchi's Version2 proposal for Dr. Henry Ngo's AI For Extended Reality course (June 2026).

## What ships today (v0.1.0a1)

- Typed Provider protocols for the three primitives the proposal specifies:
  - **YOLO-World** — open-vocabulary object detection
  - **SAM2** — promptable segmentation
  - **Depth Anything V2** — monocular depth estimation
- Deterministic `Mock*` providers behind each protocol so the rest of the ECC stack (trading-quest, banking-quest, council-runner) can integrate against the contract today without pulling GB of model weights.
- A `SceneGrounder` that composes the three into a `PerceptionResult` — a list of `SceneObject`s with normalized depth + estimated 3D position in Three.js coords (`+y` up, `−z` camera-away). This is the integration point the XR scenes consume.
- 8 pytest tests covering the contract + the projection math.

## What does not ship yet

The real model adapters. Each lives behind a `pip install embodied-perception[yolo_world]`, `[sam2]`, `[depth_anything]`, or `[all]` extra, and the adapter modules are stubbed pending Phase 2.

Phase 2 unlocks when:
- Lora confirms whether the XR-class deliverable (her Version2 proposal, Bull/Bear/Judge/Critic/Auditor voices) shares the runtime with ECC's banking-compliance vertical or is a separate Orallexa XR app, AND
- ICAIF 2027 demo timeline forces the perception layer to be real, not stubbed.

## Why mock-first

The Mock providers are not throwaway scaffolding. They unblock:
1. Three.js scene layout work in `apps/trading-quest` — the scene-grounder math is the same whether detections come from YOLO-World or from MockYoloWorld.
2. Pre-IRB study protocol design — researchers can paper-prototype the gating UX without GPUs.
3. CI/CD on the perception package — no model weights in CI means tests run in seconds.

Same pattern as `packages/orallexa-risk` Phase A v0 textbook implementations: ship the contract + a baseline that exercises the contract, then replace the baseline with the real implementation when the upstream work unblocks.

## Quickstart

```python
import numpy as np
from embodied_perception import ground_scene

frame = np.zeros((480, 640, 3), dtype=np.uint8)
result = ground_scene(frame, prompts=["loan applicant document", "credit card", "compliance binder"])
for obj in result.objects:
    print(obj.detection.label, obj.median_depth, obj.position_xyz_m)
```

## Install

```bash
pip install -e packages/perception
pip install -e "packages/perception[test]"

# When real models are wired:
# pip install -e "packages/perception[yolo_world]"
# pip install -e "packages/perception[sam2]"
# pip install -e "packages/perception[depth_anything]"
# pip install -e "packages/perception[all]"
```

## Test

```bash
cd packages/perception
pytest -v
```

## License

MIT
