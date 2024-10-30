import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SidebarItemProps } from "../interfaces/interfaces";

export const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  open,
  title,
  onClick,
}) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={`http://localhost:4000/file/${id}`}
            alt={title}
            style={{
              width: 200,
              height: 120,
              borderRadius: "4px",
              display: open ? "block" : "none",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </ListItemIcon>
        {open && <ListItemText primary={title} sx={{ textAlign: "center" }} />}
      </ListItemButton>
    </ListItem>
  );
};
