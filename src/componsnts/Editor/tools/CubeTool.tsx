import { StateNode, TLEventHandlers, createShapeId } from "tldraw";
import { CubeShape } from "../shapes/CubeShape";

export class CubeTool extends StateNode {
  static override id = "cube";
  static override initial = "idle";
  static override children = () => [Idle, Pointing, Creating];
}

export class Idle extends StateNode {
  static override id = "idle";

  override onEnter = () => {
    this.editor.setCursor({ type: "cross", rotation: 0 });
  };

  override onPointerDown: TLEventHandlers["onPointerDown"] = (info) => {
    this.parent.transition("pointing", info);
  };

  override onCancel = () => {
    this.editor.setCurrentTool("select");
  };
}

export class Pointing extends StateNode {
  static override id = "pointing";

  override onEnter = () => {
    const { inputs } = this.editor;
    const { currentPagePoint } = inputs;
    const cubeId = createShapeId();

    this.editor.createShapes<CubeShape>([
      {
        id: cubeId,
        type: "cube",
        x: currentPagePoint.x,
        y: currentPagePoint.y,
        props: {
          w: 1,
          h: 1,
          color: "#1e90ff",
          radius: 50,
          radiusColor: "#ff6b6b",
          radiusOpacity: 0.3,
        },
      },
    ]);

    this.editor.select(cubeId);
    this.parent.transition("creating", { shapeId: cubeId });
  };
}

export class Creating extends StateNode {
  static override id = "creating";

  shapeId = createShapeId();

  override onEnter = (info: { shapeId: any }) => {
    this.shapeId = info.shapeId;
    this.editor.setCursor({ type: "cross", rotation: 0 });
  };

  override onPointerMove: TLEventHandlers["onPointerMove"] = () => {
    const { inputs } = this.editor;
    const shape = this.editor.getShape(this.shapeId) as CubeShape;
    if (!shape) return;

    const { originPagePoint, currentPagePoint } = inputs;

    const w = Math.abs(currentPagePoint.x - originPagePoint.x);
    const h = Math.abs(currentPagePoint.y - originPagePoint.y);

    this.editor.updateShapes<CubeShape>([
      {
        id: this.shapeId,
        type: "cube",
        props: {
          ...shape.props,
          w: Math.max(1, w),
          h: Math.max(1, h),
        },
      },
    ]);
  };

  override onPointerUp: TLEventHandlers["onPointerUp"] = () => {
    this.parent.transition("idle");
  };

  override onCancel = () => {
    this.editor.deleteShapes([this.shapeId]);
    this.parent.transition("idle");
  };

  override onComplete = () => {
    this.parent.transition("idle");
  };
}
