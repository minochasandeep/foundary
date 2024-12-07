// ** Type Imports
import { Palette, alpha } from '@mui/material'

const DefaultPalette = (mode: Palette['mode']): Palette => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '47, 43, 61'
  const darkColor = '208, 212, 241'
  const darkPaperBgColor = '#1d1e21'
  const mainColor = mode === 'light' ? lightColor : darkColor
  const textColor = mode === 'light' ? "#1E1E1E" : "#FDFFFF"
  const greyColor = mode === 'light' ? "#212428" : "#eaeffc";

  return {
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: "#00AAFF",
      main: "#0F3CFF",
      dark: "#333333",
      contrastText: whiteColor
    },
    secondary: {
      light: "#DCFAF3",
      main: "#17E5B9",
      dark: "#333",
      contrastText: whiteColor
    },
    error: {
      light: "#FF7474",
      main: "#FF4242",
      dark: "#CE4A4B",
      contrastText: whiteColor
    },
    warning: {
      light: "#FFEBCC",
      main: "#FFA519",
      dark: "#402906",
      contrastText: whiteColor
    },
    info: {
      light: "#1FD5EB",
      main: "#00CFE8",
      dark: "#00B6CC",
      contrastText: whiteColor
    },
    success: {
      light: "#E0F2DA",
      main: "#3CCC0E",
      dark: "#134004",
      contrastText: whiteColor
    },
    grey: {
      900: alpha(greyColor, 0.80),
      800: alpha(greyColor, 0.70),
      700: alpha(greyColor, 0.40),
      600: alpha(greyColor, 0.30),
      500: alpha(greyColor, 0.12),
      400: alpha(greyColor, 0.10),
      300: alpha(greyColor, 0.075),
      200: alpha(greyColor, 0.035),
      100: alpha(greyColor, 0.025),
      50: alpha(greyColor, 0.015),
    },
    text: {
      primary: textColor,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.42)`
    },
    divider: `rgba(${mainColor}, 0.16)`,
    background: {
      paper: mode === 'light' ? whiteColor : darkPaperBgColor,
      default: mode === 'light' ? whiteColor : darkPaperBgColor,
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.06)`,
      selectedOpacity: 0.06,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    },
  } as Palette
}

export default DefaultPalette
