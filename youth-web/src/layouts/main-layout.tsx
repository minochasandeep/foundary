"use client";
import Box from "@mui/material/Box";
import useSwr from "swr";
import { Header } from "@/components/common/header";
import { ThemeProvider } from "@mui/material";
import { LocalePreference, Preference, ThemePreference } from "preferences";
import { darkTheme, lightTheme } from "@/theme/theme";
import { useNotification } from "@/hooks/use-notification";
import { useEffect, useState } from "react";
import eventEmitter from "@/utils/event-emitter/event-emitter";

import { NextIntlClientProvider } from "next-intl";
import { DEFAULT_LOCALE } from "@/constants/locale.constants";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const storedTheme = window.localStorage.getItem("theme");
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : { theme: "light" };
  // let darkMode = initialTheme?.theme === "dark";
  const darkMode = initialTheme?.theme === "dark";

  // fetch locale data // set default to en
  const { data: localeData } = useSwr<Preference<LocalePreference>>(
    "/preferences/locale",
  );
  const locale = localeData?.value?.locale
    ? localeData?.value?.locale
    : DEFAULT_LOCALE;
  const [messages, setMessages] = useState({});


  const { showNotification } = useNotification();

  // handle centralized error and success notifications using event emitter
  useEffect(() => {
    eventEmitter.on("Error", (message: string) => {
      showNotification("error", message);
    });

    eventEmitter.on("Success", (message: string) => {
      showNotification("success", message);
    });
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <NextIntlClientProvider
        locale={localeData ? locale : DEFAULT_LOCALE}
        messages={messages}
        
      >
        <Box
          overflow="hidden"
          height="100vh"
          display="flex"
          flexDirection="column"
        >
          <Header />
          {children}
        </Box>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
