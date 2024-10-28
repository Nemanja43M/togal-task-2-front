import React from "react";
import { CustomButtonProps } from "../interfaces/interfaces";
import { StyledButton } from "./style/StyledMix";

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  label,
  disabled,
  startIcon,
}) => {
  return (
    <StyledButton variant="contained" onClick={onClick} disabled={disabled}>
      {startIcon && <span style={{ marginRight: 8 }}>{startIcon}</span>} {label}
    </StyledButton>
  );
};

export default CustomButton;
