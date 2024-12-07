import React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Controller } from "react-hook-form";

import { FormSelectProps } from "./types";

// This is a common form input component that can be reused across the application
const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  control,
  disabled,
  options = [],
  labelField = "label",
  valueField = "value",
}) => {
  return (
    <FormControl fullWidth variant="standard">
      {label && <InputLabel id={`select-input-label`}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        defaultValue={""}
        render={({ field }) => (
          <Select labelId="select-label" sx={{ mb: 1 }} {...field}>
            {options.map((item) => (
              <MenuItem
                key={`$select-item-${item[valueField]}`}
                value={item[valueField]}
              >
                {item[labelField]}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default FormSelect;
