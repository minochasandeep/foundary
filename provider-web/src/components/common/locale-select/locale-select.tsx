import React from "react";

// material-ui imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// local imports
import { LocaleSelectProps } from "./types";
import { useSwrWithTrigger } from "@/hooks/swr-hooks";
import { LocalePreference, Preference } from "preferences";
import { DEFAULT_LOCALE, LOCALES } from "@/constants/locale.constants";

const LocaleSelect: React.FC<LocaleSelectProps> = ({}) => {
  const { data, trigger } = useSwrWithTrigger<
    Preference<LocalePreference>,
    LocalePreference
  >("/preferences/locale", { handleError: false, handleSuccess: false });
  const locale = data?.value?.locale || DEFAULT_LOCALE;

  const handleLocaleChange = async (event: SelectChangeEvent) => {
    const newLocale: LocalePreference = { locale: event.target.value };
    await trigger(newLocale);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <Select
          labelId="locale-select-label"
          id="locale-select"
          value={locale}
          label="Locale"
          onChange={handleLocaleChange}
        >
          {LOCALES.map(({ name, code }) => (
            <MenuItem key={`locale-${code}`} value={code}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LocaleSelect;
