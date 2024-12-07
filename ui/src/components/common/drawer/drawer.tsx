"use client";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";

export default function Drawer({
  children,
  orientation = "left",
}: Readonly<{
  children: React.ReactNode;
  orientation?: "left" | "right";
}>) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const chevronOpen =
    orientation === "left" ? <ChevronLeft /> : <ChevronRight />;
  const chevronClosed =
    orientation === "left" ? <ChevronRight /> : <ChevronLeft />;

  return (
    <Box 
      sx={{
        overflowY: "auto",
        height: "100%",
        minWidth: "fit-content",
        display: "flex",
        flexDirection: orientation === "left" ? "row" : "row-reverse",
        minHeight: "fit-content",
        backgroundColor: "background.paper",
      }}
    >
      {isOpen && children}
      <Box
        onClick={toggleDrawer}
        sx={{
          display: "flex",
          cursor:"pointer",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <IconButton
          onClick={toggleDrawer}
          sx={{
            width: "100%",
            padding: 0,
            borderRadius: 0,
          }}
        >
          {isOpen ? chevronOpen : chevronClosed}
        </IconButton>
      </Box>
    </Box>
  );
}
