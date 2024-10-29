import React, { useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import { Box, List, Divider, IconButton } from "@mui/material";

import { StyledNavbar, StyledNavbarHeader } from "./style/styled";

import logo from "../img/64c804c83c2a878381a29da5_logo_togal.png";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleToggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <StyledNavbar variant="permanent" open={open}>
      <StyledNavbarHeader>
        {open && (
          <Box>
            <img src={logo} alt="Logo" height="34px%" />
          </Box>
        )}
        <IconButton onClick={handleToggleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </StyledNavbarHeader>
      <Divider />
      <List>
        <SidebarItem
          open={open}
          icon={<BrokenImageOutlinedIcon />}
          title="Image1"
          onClick={() => {}}
        />
      </List>
    </StyledNavbar>
  );
};
