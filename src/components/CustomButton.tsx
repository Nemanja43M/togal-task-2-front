import React from "react";
import { CustomButtonProps } from "../interfaces/interfaces";
import { StyledButton } from "./style/StyledMix";

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  label,
  disabled,
}) => {
  return (
    <StyledButton variant="contained" onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  );
};

export default CustomButton;
