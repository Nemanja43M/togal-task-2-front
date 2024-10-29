import { AppBar, Box, BoxProps, IconButton, Toolbar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { closedMixin, openedMixin } from "./StyledMix";

export const StyledNavbarHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const StyledNavbar = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  "& .MuiPaper-root": {
    display: "flex",
    justifyContent: `flex-start`,
    color: "#fff",
    backgroundColor: "#01082D",
    "& svg": {
      color: "#fff",
    },
  },

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const StyledBackground = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(209,221,241)",
}));

export const StyledToolbar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: "15%",
  bottom: "15%",
  right: "10px",
  width: "fit-content",
  justifyContent: "center",
  borderRadius: 10,
  mt: 3,
  backgroundColor: "#01082D",
}));

export const StyledToolbarContainer = styled(Toolbar)(({ theme }) => ({
  padding: "0 10px !important",
}));

export const StyledToolbarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

export const StyledIconBtn = styled(IconButton)(({ theme }) => ({
  color: "#fff",
  borderRadius: 3,
  "&:hover": {
    color: "orange",
  },
  "&.Mui-disabled": {
    color: "#888",
  },
  "& .MuiTypography-root": {
    display: "block",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
}));
