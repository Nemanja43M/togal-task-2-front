import { DragEvent } from "react";

export interface ImageUploaderProps {
  onUpload: (src: string) => void;
}
export interface UploadResponse {
  filename: string;
  id: number;
  mimetype: string;
  path: string;
  uploadedAt: string;
}

export interface ImageViewerProps {
  src: string | null;
}
export interface DragAndDropHandlers {
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
}
export interface Transformation {
  rotation: number;
  scale: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}
export interface CustomButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}
export type State = {
  transformations: Transformation;
  history: Transformation[];
  redoStack: Transformation[];
};

export type Action =
  | { type: "rotate" }
  | { type: "scale"; payload: number }
  | { type: "reset" }
  | { type: "flipHorizontal" }
  | { type: "flipVertical" }
  | { type: "undo" }
  | { type: "redo" };
