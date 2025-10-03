import {
  Tldraw,
  TLComponents,
  TLUiOverrides,
  DefaultToolbar,
  DefaultToolbarContent,
  TldrawUiMenuItem,
  useEditor,
  track,
} from "tldraw";
import "tldraw/tldraw.css";
import { CubeShapeUtil } from "./shapes/CubeShape";
import { CubeTool } from "./tools/CubeTool";
import { RadiusSlider } from "./components/RadiusSlider";
import { CubeIcon } from "./components/CubeToolbar";

// Custom toolbar with cube tool
const CustomToolbar = track(function CustomToolbar() {
  const editor = useEditor();
  const currentTool = editor.getCurrentTool();
  const isCubeToolActive = currentTool?.id === "cube";

  return (
    <DefaultToolbar>
      <DefaultToolbarContent />
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => {
            editor.setCurrentTool("cube");
          }}
          style={{
            width: "40px",
            height: "40px",
            border: isCubeToolActive ? "2px solid #007acc" : "1px solid #ccc",
            borderRadius: "4px",
            background: isCubeToolActive ? "#f0f8ff" : "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 4px",
          }}
          title="Cube Tool (C)"
        >
          <CubeIcon />
        </button>
      </div>
    </DefaultToolbar>
  );
});

// Define custom shape types and tools
const customShapeUtils = [CubeShapeUtil];
const customTools = [CubeTool];

// Custom components
const components: TLComponents = {
  Toolbar: CustomToolbar,
  InFrontOfTheCanvas: RadiusSlider,
};

export default function TldrawCanvas() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        shapeUtils={customShapeUtils}
        tools={customTools}
        components={components}
      />
    </div>
  );
}
