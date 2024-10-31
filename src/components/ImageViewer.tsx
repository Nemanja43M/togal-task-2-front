import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImageViewerProps } from "../interfaces/interfaces";
import { useImageReducer } from "../hooks/useImageFunkcionality";
import DrawingCanvas from "./DrawingCanvas";
import { uploadImage } from "../api/api";
import styles from "./style/ImageViewer.module.css";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import ZoomOutOutlinedIcon from "@mui/icons-material/ZoomOutOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import FlipOutlinedIcon from "@mui/icons-material/FlipOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import ImageIcon from "@mui/icons-material/Image";
import { EditorToolbar } from "./EditorToolbar";
import { ToolbarItem } from "./ToolbarItem";

const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  file,
  setImageSrc,
  setFile,
}) => {
  const { state, dispatch } = useImageReducer();
  const [dataURL, setDataURL] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!src) return null;
  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    dispatch({ type: "reset" });
    setDataURL(null);
    if (setImageSrc) {
      setImageSrc(null);
    }
  };
  const handleSave = async (dataURL: string) => {
    const response = await fetch(dataURL);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, "image.png");

    try {
      await uploadImage(formData);
      window.dispatchEvent(new CustomEvent("FileUploaded"));
      resetCanvas();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleNewImage = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const validExtensions = ["image/jpeg", "image/png"];
      if (validExtensions.includes(selectedFile.type)) {
        const newImageSrc = URL.createObjectURL(selectedFile);
        if (setImageSrc) {
          setImageSrc(newImageSrc);
        }
        if (setFile) {
          setFile(selectedFile);
        }
      }
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
      <EditorToolbar>
        <ToolbarItem
          label="Change image"
          onClick={() => document.getElementById("file-input")?.click()}
          icon={<ImageIcon />}
        />
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleNewImage}
        />
        <ToolbarItem
          onClick={() => {
            const dataURL = canvasRef.current?.toDataURL("image/png");
            if (dataURL) handleSave(dataURL);
          }}
          label="Save Image"
          icon={<SaveOutlinedIcon />}
        />
        <ToolbarItem
          onClick={() => dispatch({ type: "rotate" })}
          label="Rotate 90°"
          icon={<RotateRightOutlinedIcon />}
        />
        <ToolbarItem
          onClick={() => dispatch({ type: "scale", payload: 0.1 })}
          label="Zoom In"
          icon={<ZoomInOutlinedIcon />}
        />
        <ToolbarItem
          onClick={() => dispatch({ type: "scale", payload: -0.1 })}
          label="Zoom Out"
          icon={<ZoomOutOutlinedIcon />}
        />
        <ToolbarItem
          onClick={() => dispatch({ type: "reset" })}
          label="Reset"
          icon={<RefreshOutlinedIcon />}
        />
        <ToolbarItem
          onClick={() => dispatch({ type: "flipHorizontal" })}
          label="Flip Horizontal"
          icon={<FlipOutlinedIcon />}
        />
        <ToolbarItem
          onClick={() => dispatch({ type: "flipVertical" })}
          label="Flip Vertical"
          icon={<FlipOutlinedIcon style={{ transform: "scaleX(-1)" }} />}
        />
        <ToolbarItem
          onClick={() => dispatch({ type: "undo" })}
          label="Undo"
          disabled={!state.history.length}
          icon={<UndoOutlinedIcon />}
        />
        <ToolbarItem
          onClick={() => dispatch({ type: "redo" })}
          label="Redo"
          disabled={!state.redoStack.length}
          icon={<RedoOutlinedIcon />}
        />
      </EditorToolbar>
    </div>
  );
};

export default ImageViewer;
