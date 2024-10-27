import React from "react";
import { ImageViewerProps } from "../interfaces/interfaces";
import { useImageReducer } from "../hooks/useUndoRedo";
import CustomButton from "./CustomButton";

const ImageViewer: React.FC<ImageViewerProps> = ({ src }) => {
  const { state, dispatch } = useImageReducer();

  if (!src) return null;

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <img
        src={src}
        alt="Uploaded"
        style={{
          maxWidth: "100%",
          transform: `rotate(${state.transformations.rotation}deg) scale(${
            state.transformations.scale
          }) ${state.transformations.flipHorizontal ? "scaleX(-1)" : ""} ${
            state.transformations.flipVertical ? "scaleY(-1)" : ""
          }`,
          transition: "transform 0.2s ease-in-out",
          marginBottom: "20px",
        }}
      />
      <div>
        <div>
          <CustomButton
            onClick={() => dispatch({ type: "rotate" })}
            label="Rotate 90°"
          />
          <CustomButton
            onClick={() => dispatch({ type: "scale", payload: 0.1 })}
            label="Zoom In"
          />
          <CustomButton
            onClick={() => dispatch({ type: "scale", payload: -0.1 })}
            label="Zoom Out"
          />
          <CustomButton
            onClick={() => dispatch({ type: "reset" })}
            label="Reset"
          />
          <CustomButton
            onClick={() => dispatch({ type: "flipHorizontal" })}
            label="Flip Horizontal"
          />
          <CustomButton
            onClick={() => dispatch({ type: "flipVertical" })}
            label="Flip Vertical"
          />
          <CustomButton
            onClick={() => dispatch({ type: "undo" })}
            label="Undo"
            disabled={!state.history.length}
          />
          <CustomButton
            onClick={() => dispatch({ type: "redo" })}
            label="Redo"
            disabled={!state.redoStack.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
