// components/AccordionCheckboxListProps.ts

import { AccordionProps, ListProps, ListItemProps } from "@mui/material";

export interface Item {
  label: string;
  value: string | number;
}

export interface AccordionCheckboxListProps {
  title: string;
  items: any[];
  labelField?: string;
  valueField?: string;
  fromDateField?: string;
  onChange: (values: string[]) => void;
  accordionProps?: AccordionProps;
  listProps?: ListProps;
  listItemProps?: ListItemProps;
  disabled?: boolean;
}
