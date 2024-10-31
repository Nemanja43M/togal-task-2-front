import React, { useState, ChangeEvent, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { uploadImage } from "../api/api";
import ImageViewer from "./ImageViewer";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile) {
      const validExtensions = ["image/jpeg", "image/png"];
      if (validExtensions.includes(selectedFile.type)) {
        if (fileInputRef.current) fileInputRef.current.value = "";

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

  const { onDragEnter, onDragLeave, onDragOver, onDrop, isDragging } =
    useDragAndDrop((droppedFile) => handleFileSelect(droppedFile));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        paddingLeft: 9,
        paddingRight: 9,
      }}
    >
      {imageSrc ? (
        <ImageViewer
          setFile={setFile}
          src={imageSrc}
          file={file}
          setImageSrc={setImageSrc}
        />
      ) : (
        <Box
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          sx={{
            border: "2px dashed #aaa",
            maxWidth: 500,
            height: 250,
            padding: 4,
            textAlign: "center",
            backgroundColor: isDragging ? "#e8f0fe" : "#f9f9f9",
            color: "#7494ec",
            borderRadius: 2,
            cursor: "pointer",
            transition: "background-color 0.3s, border-color 0.3s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloudUploadOutlinedIcon
            sx={{ fontSize: 64, color: "#7494ec", marginBottom: 1 }}
          />
          <Typography variant="body1">
            Drag and drop your files here, or click to upload
          </Typography>
        </Box>
      )}
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
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default ImageUploader;
