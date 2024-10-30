import React, { useEffect, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, List, Divider, IconButton, Typography } from "@mui/material";

import { StyledNavbar, StyledNavbarHeader } from "./style/styled";

import logo from "../img/64c804c83c2a878381a29da5_logo_togal.png";
import { SidebarItem } from "./SidebarItem";
import { FileResponse } from "../interfaces/interfaces";
import { getAllFiles } from "../api/api";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [files, setFiles] = useState<FileResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleToggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const allFiles = await getAllFiles();
      setFiles(allFiles);
    } catch (error) {
      setError("Failed to fetch files.");
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();

    const handleFileUploaded = (event: Event) => {
      const customEvent = event as CustomEvent;
      fetchFiles();
    };

    window.addEventListener("FileUploaded", handleFileUploaded);

    return () => {
      window.removeEventListener("FileUploaded", handleFileUploaded);
    };
  }, []);

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
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : files.length > 0 ? (
          files.map((file) => (
            <SidebarItem
              key={file.id}
              id={file.id}
              open={open}
              title={file.filename}
              onClick={() => {
                console.log(`Selected file ID: ${file.id}`);
              }}
            />
          ))
        ) : (
          <Typography>No files available</Typography>
        )}
      </List>
    </StyledNavbar>
  );
};
