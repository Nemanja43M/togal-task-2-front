import React, { useState, ChangeEvent, useRef } from "react";
import { Button, Typography } from "@mui/material";
import { uploadImage } from "../api/api";
import ImageViewer from "./ImageViewer";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDropFile = (droppedFile: File) => {
    const validExtensions = ["image/jpeg", "image/png"];
    if (!validExtensions.includes(droppedFile.type)) {
      setError("Please upload a file in JPG or PNG format.");
      setFile(null);
      setImageSrc(null);
      return;
    }

    setFile(droppedFile);
    setImageSrc(URL.createObjectURL(droppedFile));
    setError(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleDropFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await uploadImage(formData);
      setFile(null);
      setImageSrc(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setError("Failed to upload the image. Please try again.");
    }
  };

  const { onDragEnter, onDragLeave, onDragOver, onDrop, isDragging } =
    useDragAndDrop(handleDropFile);

  return (
    <div>
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        style={{
          border: isDragging ? "2px dashed #000" : "2px dashed #aaa",
          padding: "30px",
          textAlign: "center",
          backgroundColor: isDragging ? "#f0f0f0" : "transparent",
        }}
      >
        Drad and Drop
      </div>
      <input
        accept="image/*"
        type="file"
        onChange={handleFileChange}
        id="upload-button"
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <label htmlFor="upload-button">
        <Button variant="contained" component="span">
          Select Image
        </Button>
      </label>
      <Button variant="contained" onClick={handleUpload} disabled={!file}>
        Upload Image
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <ImageViewer src={imageSrc} />
    </div>
  );
};

export default ImageUploader;
