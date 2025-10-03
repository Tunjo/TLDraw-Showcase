import React, { useCallback } from "react";
import { Editor, useEditor, track } from "tldraw";
import { CubeShape } from "../shapes/CubeShape";

interface RadiusSliderProps {
  selectedShapes: CubeShape[];
}

export const RadiusSlider = track(function RadiusSlider() {
  const editor = useEditor();
  const selectedShapes = editor
    .getSelectedShapes()
    .filter((shape): shape is CubeShape => shape.type === "cube");

  const currentRadius =
    selectedShapes.length > 0 ? selectedShapes[0].props.radius : 50;
  const currentRadiusColor =
    selectedShapes.length > 0 ? selectedShapes[0].props.radiusColor : "#ff6b6b";
  const currentRadiusOpacity =
    selectedShapes.length > 0 ? selectedShapes[0].props.radiusOpacity : 0.3;

  const handleRadiusChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newRadius = parseInt(event.target.value, 10);
      console.log("Updating radius to:", newRadius);

      if (selectedShapes.length > 0) {
        editor.updateShapes(
          selectedShapes.map((shape) => ({
            id: shape.id,
            type: shape.type,
            props: {
              ...shape.props,
              radius: newRadius,
            },
          }))
        );
      }
    },
    [editor, selectedShapes]
  );

  const handleRadiusColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;

      if (selectedShapes.length > 0) {
        editor.updateShapes(
          selectedShapes.map((shape) => ({
            id: shape.id,
            type: shape.type,
            props: {
              ...shape.props,
              radiusColor: newColor,
            },
          }))
        );
      }
    },
    [editor, selectedShapes]
  );

  const handleRadiusOpacityChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newOpacity = parseFloat(event.target.value);

      if (selectedShapes.length > 0) {
        editor.updateShapes(
          selectedShapes.map((shape) => ({
            id: shape.id,
            type: shape.type,
            props: {
              ...shape.props,
              radiusOpacity: newOpacity,
            },
          }))
        );
      }
    },
    [editor, selectedShapes]
  );

  if (selectedShapes.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "white",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        border: "1px solid #e1e4e8",
        zIndex: 1000,
        minWidth: "250px",
      }}
    >
      <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "600" }}>
        Cube Radius Settings
      </h4>

      <div style={{ marginBottom: "12px" }}>
        <label
          style={{
            display: "block",
            fontSize: "12px",
            marginBottom: "4px",
            fontWeight: "500",
          }}
        >
          Radius: {currentRadius}px
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={currentRadius}
          onChange={handleRadiusChange}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label
          style={{
            display: "block",
            fontSize: "12px",
            marginBottom: "4px",
            fontWeight: "500",
          }}
        >
          Radius Color
        </label>
        <input
          type="color"
          value={currentRadiusColor}
          onChange={handleRadiusColorChange}
          style={{
            width: "100%",
            height: "32px",
            border: "none",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "0" }}>
        <label
          style={{
            display: "block",
            fontSize: "12px",
            marginBottom: "4px",
            fontWeight: "500",
          }}
        >
          Opacity: {Math.round(currentRadiusOpacity * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={currentRadiusOpacity}
          onChange={handleRadiusOpacityChange}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
});
