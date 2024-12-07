// DateControl.js
import React from "react";
import { Box, TextField } from "@mui/material";
import { DateControlProps } from "./types";

const DateControl: React.FC<DateControlProps> = ({ value, onFromDateChange, fromDate, getTodayDate }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pl: "12px" }}>
            <TextField
                
                type="date"
                label="From"
                size="small"
                value={fromDate || ""}
                onChange={(e) => onFromDateChange(value, e.target.value)}
                sx={{
                    mb: 1,
                    "& .MuiInputBase-root": {
                        fontSize: "0.65rem",
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: "0.75rem",
                    },
                    "& input::-webkit-calendar-picker-indicator": {
                        filter: "invert(1) sepia(1) saturate(5) hue-rotate(175deg)",
                    },
                }}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                    min: getTodayDate(),
                }}
            />
        </Box>
    );
};

export default DateControl;
