"use client";

import Drawer from "@/components/common/drawer/drawer";
import { HEADER_HEIGHT } from "@/constants/app.constant";
import { Box } from "@mui/material";

export default function NavigationLayout({
  navigation,
  children,
}: Readonly<{
  navigation: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      height={`calc(100vh - ${HEADER_HEIGHT}px)`}
    >
      <Drawer>{navigation}</Drawer>
      {children}
    </Box>
  );
}
