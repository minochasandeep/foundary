import React, { useEffect } from "react";

// material-ui imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { ExpandMore, ExpandLess, Info } from "@mui/icons-material";

// local imports
import { FormSectionProps } from "./types";

const FormSection: React.FC<FormSectionProps> = ({
  children,
  title,
  titleProps,
  tooltip,
  expandable,
  containerProps,
  ...restProps
}) => {
  const { sx: containerSx, ...restContainerProps } = containerProps || {};
  const [expanded, setExpanded] = React.useState(true); //By default expanded is true, because if anyone click on save without expanding the section he can't see the error message. and to prevent hide if expandable is false

  return (
    <Box {...restProps}>
      {title && (
        <Box display={"flex"} color={"text.primary"}>
          {expandable && (
            <Box
              display={"flex"}
              alignItems={"center"}
              mr={1}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </Box>
          )}
          <Box display={"flex"} flex={1}>
            <Typography
              fontWeight={400}
              fontStyle={"normal"}
              fontSize={"18px"}
              {...titleProps}
            >
              {title}
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Tooltip title={tooltip}>
              <Info sx={{ height: "16px", width: "16px" }} color={"inherit"} />
            </Tooltip>
          </Box>
        </Box>
      )}
      {expanded && (
        <Box
          sx={{
            p: 1,
            borderRadius: "8px",
            bgcolor: "background.paper",
            ...containerSx,
          }}
          {...restContainerProps}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

export default FormSection;
