"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

import palette from './palette'

const baseTheme = {
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
}

export const darkTheme = createTheme({
  ...baseTheme,
  palette: palette("dark"),
});

export const lightTheme = createTheme({
  ...baseTheme,
  palette: palette("light"),
});

