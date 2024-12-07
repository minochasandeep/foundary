import React from "react";
import { TextField, CircularProgress, Autocomplete } from "@mui/material";

interface SearchableDropdownProps {
  placeholder: string;
  label: string;
  errors: any;
  name: string;
  options: { id: any; name: string }[];
  optionsLabel: string;
  value: any;
  loading: boolean;
  onChange: (option: { id: any; name: string }) => void;
  onClear?: () => void;
  onInputChange: (searchTerm: string) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  placeholder,
  label,
  optionsLabel,
  name,
  options,
  value,
  loading,
  onChange,
  onClear,
  onInputChange,
  onKeyPress,
  errors,
}) => {
  const defaultValue: { [key: string]: any } = {};
  defaultValue[optionsLabel] = "";

  return (
    <Autocomplete
      value={value || null}
      onInputChange={(event, newInputValue) => {
        onInputChange(newInputValue);
      }}
      onChange={(event, newValue) => {
        if (newValue === null && typeof onClear === "function") {
          onClear();
        } else if (newValue) {
          onChange(newValue);
        }
      }}
      options={options}
      loading={loading}
      // Customize the comparison of options and value
      isOptionEqualToValue={(option, value) => option.id === value.id}
      // Ensure getOptionLabel always returns a string
      getOptionLabel={(option) => {
        return option[optionsLabel] || option.name || "";
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          placeholder={placeholder}
          label={label}
          variant="standard"
          InputLabelProps={{ shrink: true }}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name].message : ""}
          sx={{ mb: 1 }}
          onKeyDown={(e) => {
            if (onKeyPress) {
              onKeyPress(e);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchableDropdown;
