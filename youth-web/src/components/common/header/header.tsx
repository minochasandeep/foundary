// components/Header.js
import { useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Preference, ThemePreference } from "preferences";
import { useSwrWithTrigger } from "@/hooks/swr-hooks";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { usePathname } from "next/navigation";
import { Tooltip } from "@/components/core/tooltip";
import { useTranslations } from "next-intl";


const Header = () => {
  const t = useTranslations("Header");
  /* const { data, trigger } = useSwrWithTrigger<
    Preference<ThemePreference>,
    ThemePreference
  >("/preferences/theme", { handleSuccess: false }); */
  const data = { value: { theme: "dark" } };
  // const darkMode = data?.value.theme === "dark";
  const storedTheme = window.localStorage.getItem("theme");
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : { theme: "light" };
  // let darkMode = initialTheme?.theme === "dark";
  const [darkMode, setDarkmode] = useState(initialTheme?.theme === "dark");

  const handleThemeChange = async () => {
    const newTheme: ThemePreference = { theme: darkMode ? "light" : "dark" };
    localStorage.setItem("theme", JSON.stringify(newTheme));
    setDarkmode(!darkMode);
    // await trigger(newTheme);
  };

  const pathname = usePathname();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.common.black
            : theme.palette.common.white,
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Link href="/" passHref>
            <Image
              src={`/images/${darkMode ? "logo" : "logo_dark"}.png`}
              alt="Foundary"
              width={140}
              height={15}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
         
        </Box>
        
        <Tooltip title={darkMode ? t("themeToLight") : t("themeToDark")}>
          <IconButton
            data-testid={"theme-toggle-button"}
            onClick={handleThemeChange}
          >
            {darkMode ? <LightModeOutlinedIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
