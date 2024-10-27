import { useState } from "react";

export const useDragAndDrop = (handleFile: (file: File) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
      e.dataTransfer.clearData();
    }
  };

  return {
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    isDragging,
  };
};
