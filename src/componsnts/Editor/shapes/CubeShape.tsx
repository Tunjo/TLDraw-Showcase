import {
  BaseBoxShapeUtil,
  DefaultColorStyle,
  HTMLContainer,
  Rectangle2d,
  TLBaseShape,
  T,
  resizeBox,
  structuredClone,
  Vec,
} from "tldraw";

// Define the cube shape type
export type CubeShape = TLBaseShape<
  "cube",
  {
    w: number;
    h: number;
    color: string;
    radius: number;
    radiusColor: string;
    radiusOpacity: number;
  }
>;

// Shape validator
export const cubeShapeProps = {
  w: T.number,
  h: T.number,
  color: T.string,
  radius: T.number,
  radiusColor: T.string,
  radiusOpacity: T.number,
};

// Shape utility class
export class CubeShapeUtil extends BaseBoxShapeUtil<CubeShape> {
  static override type = "cube" as const;
  static override props = cubeShapeProps;

  getDefaultProps(): CubeShape["props"] {
    return {
      w: 100,
      h: 100,
      color: "#1e90ff",
      radius: 50,
      radiusColor: "#ff6b6b",
      radiusOpacity: 0.3,
    };
  }

  getGeometry(shape: CubeShape): Rectangle2d {
    // The geometry includes both the cube and its radius
    const maxDimension = Math.max(
      shape.props.w + shape.props.radius * 2,
      shape.props.h + shape.props.radius * 2
    );
    return new Rectangle2d({
      width: maxDimension,
      height: maxDimension,
      x: -maxDimension / 2,
      y: -maxDimension / 2,
      isFilled: true,
    });
  }

  component(shape: CubeShape) {
    const { w, h, color, radius, radiusColor, radiusOpacity } = shape.props;

    // Calculate the center position for the cube within the larger geometry
    const cubeX = -w / 2;
    const cubeY = -h / 2;

    // Calculate circle radius and center
    const circleRadius = radius;
    const circleX = -circleRadius;
    const circleY = -circleRadius;

    return (
      <HTMLContainer style={{ pointerEvents: "all" }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`${-Math.max(w / 2 + radius, h / 2 + radius)} ${-Math.max(
            w / 2 + radius,
            h / 2 + radius
          )} ${Math.max(w + radius * 2, h + radius * 2)} ${Math.max(
            w + radius * 2,
            h + radius * 2
          )}`}
          style={{ overflow: "visible" }}
        >
          {/* Radius circle - rendered first so it appears behind */}
          {radius > 0 && (
            <circle
              cx={0}
              cy={0}
              r={circleRadius}
              fill={radiusColor}
              fillOpacity={radiusOpacity}
              stroke={radiusColor}
              strokeWidth={1}
              strokeOpacity={radiusOpacity * 1.5}
            />
          )}

          {/* 3D Cube */}
          <g>
            {/* Front face */}
            <rect
              x={cubeX}
              y={cubeY}
              width={w}
              height={h}
              fill={color}
              stroke="#000"
              strokeWidth={2}
            />

            {/* Top face (parallelogram) */}
            <path
              d={`M ${cubeX} ${cubeY} L ${cubeX + w * 0.3} ${
                cubeY - h * 0.3
              } L ${cubeX + w + w * 0.3} ${cubeY - h * 0.3} L ${
                cubeX + w
              } ${cubeY} Z`}
              fill={this.adjustColor(color, 0.8)}
              stroke="#000"
              strokeWidth={2}
            />

            {/* Right face (parallelogram) */}
            <path
              d={`M ${cubeX + w} ${cubeY} L ${cubeX + w + w * 0.3} ${
                cubeY - h * 0.3
              } L ${cubeX + w + w * 0.3} ${cubeY + h - h * 0.3} L ${
                cubeX + w
              } ${cubeY + h} Z`}
              fill={this.adjustColor(color, 0.6)}
              stroke="#000"
              strokeWidth={2}
            />
          </g>
        </svg>
      </HTMLContainer>
    );
  }

  // Helper method to adjust color brightness
  private adjustColor(color: string, factor: number): string {
    // Simple color adjustment - multiply RGB values by factor
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);

      const newR = Math.round(r * factor);
      const newG = Math.round(g * factor);
      const newB = Math.round(b * factor);

      return `#${newR.toString(16).padStart(2, "0")}${newG
        .toString(16)
        .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    }
    return color;
  }

  indicator(shape: CubeShape) {
    const { w, h, radius } = shape.props;
    const maxDimension = Math.max(w + radius * 2, h + radius * 2);

    return (
      <rect
        width={maxDimension}
        height={maxDimension}
        x={-maxDimension / 2}
        y={-maxDimension / 2}
        fill="transparent"
        stroke="var(--color-selection-stroke)"
        strokeWidth={1}
      />
    );
  }

  override onResize: (
    shape: CubeShape,
    info: Parameters<BaseBoxShapeUtil<CubeShape>["onResize"]>[1]
  ) =>
    | {
        id: CubeShape["id"];
        type: CubeShape["type"];
        props?: Partial<CubeShape["props"]> | undefined;
      }
    | undefined = (
    shape,
    { newPoint, handle, mode, scaleX, scaleY, initialBounds, initialShape }
  ) => {
    return resizeBox(shape, {
      newPoint,
      handle,
      mode,
      scaleX,
      scaleY,
      initialBounds,
      initialShape,
    });
  };
}
