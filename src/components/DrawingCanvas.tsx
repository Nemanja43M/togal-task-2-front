import React, { useState, useEffect } from "react";
import { DrawingCanvasProps } from "../interfaces/interfaces";
import styles from "./style/DrawingCanvas.module.css";
import Cube from "./Cube";

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width,
  height,
  imageUrl,
  transformations,
  canvasRef,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseEvent = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const ctx = canvasRef.current?.getContext("2d");
    const rect = canvasRef.current?.getBoundingClientRect();
    const x =
      "clientX" in e
        ? e.clientX - rect!.left
        : e.touches[0].clientX - rect!.left;
    const y =
      "clientY" in e ? e.clientY - rect!.top : e.touches[0].clientY - rect!.top;

    ctx?.lineTo(x, y);
    ctx?.stroke();
  };

  const toggleDrawing = (drawing: boolean) => {
    setIsDrawing(drawing);
    const ctx = canvasRef.current?.getContext("2d");
    if (drawing) {
      ctx?.beginPath();
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      ctx?.clearRect(0, 0, width, height);
      ctx?.save();

      ctx?.translate(width / 2, height / 2);
      ctx?.rotate((transformations.rotation * Math.PI) / 180);

      const initialScale = Math.min(width / img.width, height / img.height);
      const finalScale = initialScale * (transformations.scale || 1);

      ctx?.scale(
        transformations.flipHorizontal ? -finalScale : finalScale,
        transformations.flipVertical ? -finalScale : finalScale
      );

      ctx?.drawImage(img, -img.width / 2, -img.height / 2);
      ctx?.restore();
    };

    if (ctx) {
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "black";
    }
  }, [imageUrl, transformations, width, height]);

  return (
    <div className={styles.container}>
      <div className={styles.cube}>
        <Cube imageUrl={imageUrl} />
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={() => toggleDrawing(true)}
        onMouseUp={() => toggleDrawing(false)}
        onMouseOut={() => toggleDrawing(false)}
        onMouseMove={handleMouseEvent}
        onTouchStart={() => toggleDrawing(true)}
        onTouchEnd={() => toggleDrawing(false)}
        onTouchMove={handleMouseEvent}
        className={styles.canvas}
      />
    </div>
  );
};

export default DrawingCanvas;
