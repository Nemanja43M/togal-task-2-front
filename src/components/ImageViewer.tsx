import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ImageViewerProps } from '../interfaces/interfaces';

const ImageViewer: React.FC<ImageViewerProps> = ({ src }) => {
  const [rotation, setRotation] = useState<number>(0); 
  const [scale, setScale] = useState<number>(1); 

  if (!src) return null;

  const rotateImage = () => {
    setRotation((prev) => prev + 90); 
  };

  const scaleImage = (factor: number) => {
    setScale((prev) => Math.max(prev + factor, 0.1)); 
  };

  const resetImage = () => {
    setRotation(0);
    setScale(1);
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <img
        src={src}
        alt="Uploaded"
        style={{
          maxWidth: '100%',
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transition: 'transform 0.2s ease-in-out',
          marginBottom: '20px',
        }}
      />
      <div>
        <Button variant="contained" onClick={rotateImage}>
          Rotate 90°
        </Button>
        <Button variant="contained" onClick={() => scaleImage(0.1)}>
          Zoom In
        </Button>
        <Button variant="contained" onClick={() => scaleImage(-0.1)}>
          Zoom Out
        </Button>
        <Button variant="contained" onClick={resetImage}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ImageViewer;
