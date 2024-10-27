import React, { useState, ChangeEvent, useRef } from "react";
import { Typography } from "@mui/material";
import { uploadImage } from "../api/api";
import ImageViewer from "./ImageViewer";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import CustomButton from "./CustomButton";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import styles from "./style/DragAndDrop.module.css";

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile) {
      const validExtensions = ["image/jpeg", "image/png"];
      if (validExtensions.includes(selectedFile.type)) {
        setFile(selectedFile);
        setImageSrc(URL.createObjectURL(selectedFile));
        setError(null);
      } else {
        setError("Please upload a file in JPG or PNG format.");
        resetState();
      }
    }
  };

  const resetState = () => {
    setFile(null);
    setImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await uploadImage(formData);
      resetState();
    } catch (error) {
      setError("Failed to upload the image. Please try again.");
    }
  };

  const { onDragEnter, onDragLeave, onDragOver, onDrop, isDragging } =
    useDragAndDrop((droppedFile) => handleFileSelect(droppedFile));

  return (
    <div className={styles.mainDiv}>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`${styles.dragAndDropZone} ${
          isDragging ? styles.dragging : ""
        }`}
      >
        <CloudUploadOutlinedIcon className={styles.icon} />
        <p className={styles.text}>
          Drag and drop your files here, or click to upload
        </p>
      </div>

      <input
        accept="image/*"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFileSelect(e.target.files?.[0] || null)
        }
        id="upload-button"
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <CustomButton
        label="Upload Image"
        onClick={handleUpload}
        disabled={!file}
      />
      {error && <Typography color="error">{error}</Typography>}
      <ImageViewer src={imageSrc} />
    </div>
  );
};

export default ImageUploader;
