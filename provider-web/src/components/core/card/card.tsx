import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import { CardProps } from "./types";
import { isValidElement } from "react";

const Card: React.FC<CardProps> = ({
  title,
  titleProps,
  children,
  footer,
  contentPadding = "8px",
  backgroundColor = "grey.300",
  marginTop = 0,
  contentProps,
  containerProps,
  ...restProps
}) => {
  const { sx, ...restCardProps } = restProps || {};
  const { sx: contentSx, ...restContentProps } = contentProps || {};
  return (
    <>
      <MuiCard
        sx={{
          borderRadius: "8px",
          width: "100%",
          boxShadow: "none",
          backgroundColor: backgroundColor,
          mt: marginTop,
          ...sx,
        }}
        {...restCardProps}
      >
        {title && (
          <CardHeader
            sx={{ padding: contentPadding, pb: 0 }}
            title={title}
            titleTypographyProps={{
              fontSize: "14px",
              fontWeight: 500,
              color: "text.secondary",
              ...titleProps,
            }}
          />
        )}
        <CardContent
          sx={{
            p: contentPadding,
            "&:last-child": { paddingBottom: contentPadding },
            ...contentSx,
          }}
          {...restContentProps}
        >
          <Box {...containerProps}>
            {children}
          </Box>
        </CardContent>
        {footer && (
          <Box display={"flex"} width={"100%"}>
            {isValidElement(footer) ? (
              footer
            ) : (
              <Typography variant="body2">{footer}</Typography>
            )}
          </Box>
        )}
      </MuiCard>
    </>
  );
};

export default Card;
