import { BoxProps, CardContentProps, TypographyProps } from "@mui/material";
import { CardProps as MuiCardProps } from "@mui/material/Card";

export interface CardProps extends Omit<MuiCardProps, "title"> {
  title?: string;
  titleProps?: TypographyProps;
  footer?: string | React.ReactNode;
  contentPadding?: number | string;
  backgroundColor?: string;
  marginTop?: number | string;
  contentProps?: CardContentProps;
  containerProps?: BoxProps;
}
