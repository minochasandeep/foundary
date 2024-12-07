"use client";

import { NavMenu } from "@/components/common/nav-menu";
import { DEFAULT_MENU_ITEMS } from "@/constants/demo.constant";
import { IsDirtyContextProvider } from "@/context/userform-context";
import NavigationLayout from "@/layouts/content-detail-layouts/nav-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IsDirtyContextProvider>
        <NavigationLayout navigation={<NavMenu items={DEFAULT_MENU_ITEMS} />}>
          {children}
        </NavigationLayout>
    </IsDirtyContextProvider>
  );
}
