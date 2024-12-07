import React, { useCallback, useEffect } from "react";

// material-ui imports
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import { debounce, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

// local imports
import { SearchInputProps } from "./types";
import { useTranslations } from "next-intl";

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onSearch,
  placeholder,
  debounceTime = 500,
  ...restProps
}) => {
  const [searchValue, setSearchValue] = React.useState(value || "");
  const t = useTranslations("SearchInput");

  const { sx: inputSx, ...inputProps } = restProps;

  const debouncedSearch = useCallback(
    debounce((criteria) => {
      onSearch && onSearch(criteria);
    }, debounceTime),
    [],
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue]);

  return (
    <OutlinedInput
      value={searchValue}
      size="small"
      fullWidth
      placeholder={placeholder || `${t("search")}...`}
      endAdornment={
        <InputAdornment position="end">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "24px",
              height: "24px",
              bgcolor: "primary.main",
              borderRadius: "50%",
            }}
          >
            <Search sx={{ height: "18px", color: "common.white" }} />
          </Box>
        </InputAdornment>
      }
      sx={{
        backgroundColor: "common.white",
        borderRadius: "50px",
        color: "common.black",
        // border: "none",
        // "& fieldset": { border: "none" },
        pr: "6px",
        ...inputSx,
      }}
      inputProps={{ "data-testid": "search-input" }}
      {...inputProps}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
