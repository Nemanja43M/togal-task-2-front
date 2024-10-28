import React, { useRef, useState } from "react";
import { ImageViewerProps } from "../interfaces/interfaces";
import { useImageReducer } from "../hooks/useUndoRedo";
import CustomButton from "./CustomButton";
import DrawingCanvas from "./DrawingCanvas";
import { uploadImage } from "../api/api";
import styles from "./style/ImageViewer.module.css";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import ZoomOutOutlinedIcon from "@mui/icons-material/ZoomOutOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import FlipOutlinedIcon from "@mui/icons-material/FlipOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";

const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  file,
  handleUpload,
}) => {
  const { state, dispatch } = useImageReducer();
  const [dataURL, setDataURL] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
        setDataURL={setDataURL}
        canvasRef={canvasRef}
        transformations={state.transformations}
      />
      <div className={styles.buttonContainer}>
        <CustomButton
          label="Upload Image"
          onClick={handleUpload}
          disabled={!file}
          startIcon={<CloudUploadOutlinedIcon />}
        />
        <CustomButton
          onClick={() => {
            const dataURL = canvasRef.current?.toDataURL("image/png");
            if (dataURL) handleSave(dataURL);
          }}
          label="Sačuvaj nacrtano"
          startIcon={<SaveOutlinedIcon />}
        />
        <CustomButton
          onClick={() => dispatch({ type: "rotate" })}
          label="Rotate 90°"
          startIcon={<RotateRightOutlinedIcon />}
        />
        <CustomButton
          onClick={() => dispatch({ type: "scale", payload: 0.1 })}
          label="Zoom In"
          startIcon={<ZoomInOutlinedIcon />}
        />
        <CustomButton
          onClick={() => dispatch({ type: "scale", payload: -0.1 })}
          label="Zoom Out"
          startIcon={<ZoomOutOutlinedIcon />}
        />
        <CustomButton
          onClick={() => dispatch({ type: "reset" })}
          label="Reset"
          startIcon={<RefreshOutlinedIcon />}
        />
        <CustomButton
          onClick={() => dispatch({ type: "flipHorizontal" })}
          label="Flip Horizontal"
          startIcon={<FlipOutlinedIcon />}
        />
        <CustomButton
          onClick={() => dispatch({ type: "flipVertical" })}
          label="Flip Vertical"
          startIcon={<FlipOutlinedIcon style={{ transform: "scaleX(-1)" }} />}
        />
        <CustomButton
          onClick={() => dispatch({ type: "undo" })}
          label="Undo"
          disabled={!state.history.length}
          startIcon={<UndoOutlinedIcon />}
        />
        <CustomButton
          onClick={() => dispatch({ type: "redo" })}
          label="Redo"
          disabled={!state.redoStack.length}
          startIcon={<RedoOutlinedIcon />}
        />
      </div>
    </div>
  );
};

export default ImageViewer;
