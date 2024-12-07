"use client";

import { Box } from "@mui/material";

export default function ContentLayout({
  content,
  children,
}: Readonly<{
  content?: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
      {content && (
        <Box
          display="flex"
          flexDirection="row"
          flexGrow="1"
          width="100%"
          minWidth="0"
          overflow="auto"
        >
          {content}
        </Box>
      )}
      {children}
    </>
  );
}
