import React from "react";

// material-ui imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChartLegendProps } from "./types";

// local imports

const ChartLegend: React.FC<ChartLegendProps> = ({
  color,
  text,
  colorBoxRadius = "50%",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "grey.400",
        borderRadius: "20px",
        pl: 1,
        pr: 1,
        ml: 1,
      }}
    >
      {color && (
        <Box
          sx={{
            width: 10,
            height: 10,
            bgcolor: color,
            borderRadius: colorBoxRadius,
            marginRight: 1,
          }}
        />
      )}
      <Typography sx={{ fontSize: "12px", color: "grey.800" }}>{text}</Typography>
    </Box>
  );
};

export default ChartLegend;
