"use client";

import Drawer from "@/components/common/drawer/drawer";

export default function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  drawerWidth?: number | string;
}>) {
  return <Drawer orientation="right">{children}</Drawer>;
}
