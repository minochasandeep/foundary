"use client";

import DetailLayout from "@/layouts/content-detail-layouts/detail-layout";

export default function UserManagementDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DetailLayout>{children}</DetailLayout>;
}
