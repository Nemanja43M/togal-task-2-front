import React, { useState, ChangeEvent, useRef } from "react";
import { Typography } from "@mui/material";
import { uploadImage } from "../api/api";
import ImageViewer from "./ImageViewer";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import CustomButton from "./CustomButton";

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
        Drag and Drop
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
      <label htmlFor="upload-button">
        <CustomButton
          label="Select Image"
          onClick={() => fileInputRef.current?.click()}
        />
      </label>
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
