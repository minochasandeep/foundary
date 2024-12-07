import { BoxProps } from "@mui/material";
import { Typography } from "@mui/material/styles/createTypography";

export interface FormSectionProps extends BoxProps {
  title?: string;
  tooltip?: string;
  expandable?: boolean;
  titleProps?: Typography;
  containerProps?: BoxProps;
}
