import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface StyledButtonProps extends ButtonProps {
  href?: string;
  target?: string;
}

export const StyledButton = styled(Button)<StyledButtonProps>(() => ({
  textTransform: "none",
  backgroundColor: "#5C62F9",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#4B52D4",
  },
  "&:disabled": {
    backgroundColor: "#aaa",
    color: "#fff",
  },
}));
