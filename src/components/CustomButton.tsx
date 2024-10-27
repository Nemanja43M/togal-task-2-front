import React from "react";
import { Button } from "@mui/material";
import { CustomButtonProps } from "../interfaces/interfaces";

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  label,
  disabled,
}) => {
  return (
    <Button variant="contained" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};

export default CustomButton;
