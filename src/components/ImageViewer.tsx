import React from "react";
import { ImageViewerProps } from "../interfaces/interfaces";
import { useImageReducer } from "../hooks/useUndoRedo";
import CustomButton from "./CustomButton";
import DrawingCanvas from "./DrawingCanvas";
import { uploadImage } from "../api/api";
import styles from "./style/ImageViewer.module.css";

const ImageViewer: React.FC<ImageViewerProps> = ({ src }) => {
  const { state, dispatch } = useImageReducer();

  if (!src) return null;

  const handleSave = async (dataURL: string) => {
    const response = await fetch(dataURL);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, "image.png");

    try {
      await uploadImage(formData);
      console.log("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className={styles.container}>
      <DrawingCanvas
        width={600}
        height={400}
        imageUrl={src}
        onSave={handleSave}
        transformations={state.transformations}
      />
      <div className={styles.buttonContainer}>
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
  );
};

export default ImageViewer;
