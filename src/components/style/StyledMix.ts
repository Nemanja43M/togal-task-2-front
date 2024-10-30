import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Theme, CSSObject } from "@mui/material/styles";

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

export const openedMixin = (theme: Theme): CSSObject => ({
  width: 240,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
