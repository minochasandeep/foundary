import { ButtonProps } from "@/components/core/button";
import { BoxProps } from "@mui/material";

// The `ListviewTopbarProps` interface extends MUI's `BoxProps` .
export interface ListviewTopbarProps extends BoxProps {
  // Optional function that gets triggered when the search button is clicked
  // if not given search button will not be rendered
  onSearch?: (searchText: string) => void;

  // Optional placeholder text for the search input
  searchPlaceholder?: string;

  // Optional current search query
  searchQuery?: string;

  // Optional function that gets triggered when the create button is clicked
  // if not given create button will not be rendered
  onCreate?: () => void;

  // Optional additional props for the create button
  createButtonProps?: ButtonProps;
}
