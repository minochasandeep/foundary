"use client";
import { useCallback, useEffect, useState } from "react";

//  mui imports
import Box from "@mui/material/Box";
import { GridColDef, GridSortModel } from "@mui/x-data-grid";

// next imports
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dialog } from "@/components/core/dialog";

// local imports
import ContentLayout from "@/layouts/content-detail-layouts/content-layout";
import MeetingList from "./components/MeetingList";


export default function UserManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <ContentLayout
      content={
        <Box display="flex" flexDirection="column" width="100%" sx={{alignItems: 'center', justifyContent: 'center' }}>
          <MeetingList />
        </Box>
      }
    >
      {children}
     
    </ContentLayout>
  );
}
