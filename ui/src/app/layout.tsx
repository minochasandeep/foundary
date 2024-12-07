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
import { appInsights, reactPlugin } from "@/appInsight";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined" && !appInsights.isInitlized) {
      if (appInsights.isInitlized) return;
      appInsights.initilize(
        process.env.NEXT_PUBLIC_APPINSIGHTS_INSTRUMENTATIONKEY as string,
      );
    }
  }, []);

  return (
    <html lang={DEFAULT_LOCALE}>
      <head>
      <title>Service Provider - Schedule</title>
      </head>
      <body className={inter.className}>
      <AppInsightsContext.Provider value={reactPlugin}>
        <AppRouterCacheProvider>
        <SessionProvider refetchInterval={60 * 58}>
          <NotificationProvider>
          {/* <SecureLayout> */}
            <TimezonePreferencesProvider>
            <ErrorBoundary>
              <MainLayout>{children}</MainLayout>
            </ErrorBoundary>
            </TimezonePreferencesProvider>
          {/* </SecureLayout> */}
          </NotificationProvider>
        </SessionProvider>
        </AppRouterCacheProvider>
      </AppInsightsContext.Provider>
      </body>
    </html>
  );
}
