"use client";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import SecureLayout from "@/layouts/secure-layout";
import MainLayout from "@/layouts/main-layout";
import "./globals.css";
import SessionProvider from "../providers/session-provider";
import { NotificationProvider } from "@/context/notification-context";
import { TimezonePreferencesProvider } from "@/context/timezone-context";
import { DEFAULT_LOCALE } from "@/constants/locale.constants";
import ErrorBoundary from "@/components/common/error/error-boundary";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "@/appInsight";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang={DEFAULT_LOCALE}>
      <head>
      <title>Foundary Youth Panel</title>
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
        <SessionProvider refetchInterval={60 * 58}>
          <NotificationProvider>
            <TimezonePreferencesProvider>
            <ErrorBoundary>
              <MainLayout>{children}</MainLayout>
            </ErrorBoundary>
            </TimezonePreferencesProvider>
          </NotificationProvider>
        </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
