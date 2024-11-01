import { DragEvent } from "react";
import { Dispatch, SetStateAction, MouseEventHandler } from "react";

export interface DrawingCanvasProps {
  width: number;
  height: number;
  imageUrl: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataURL: Dispatch<SetStateAction<string | null>>;
  transformations: {
    rotation: number;
    scale: number;
    flipHorizontal: boolean;
    flipVertical: boolean;
  };
}

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
  file: File | null;
  setImageSrc?: React.Dispatch<React.SetStateAction<string | null>>;
  setFile?: React.Dispatch<React.SetStateAction<File | null>>;
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
  startIcon?: JSX.Element;
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
export interface FileResponse {
  id: number;
  filename: string;
  mimetype: string;
}
export interface UploadResponse {
  id: number;
  filename: string;
}
export interface SidebarItemProps {
  id: number;
  open: boolean;
  title: string;
  onClick: MouseEventHandler;
}
