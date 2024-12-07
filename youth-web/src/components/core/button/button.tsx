import React from "react";

// material-ui imports
import MuiButton from "@mui/material/Button";
import Box from "@mui/material/Box";

// local imports
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "contained",
  color = "primary",
  endIcon,
  ...restProps
}) => {
  const { sx, ...rest } = restProps;

  return (
    <MuiButton
      variant={variant}
      color={color}
      sx={{ 
        textTransform: "none",
        borderRadius: "40px",
        ...sx,
      }}
      {...rest}
    >
      {/* Left Content */}
      {typeof title === "string" ? (
        <Box component="span">{title}</Box>
      ) : (
        title
      )}

      {/* Optional End Icon */}
      {endIcon && <Box >{endIcon}</Box>}
    </MuiButton>
  );
};

export default Button;