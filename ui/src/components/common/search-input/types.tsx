import { OutlinedInputProps } from "@mui/material";

export interface SearchInputProps extends Omit<OutlinedInputProps, "onChange"> {
  /**
   * The value of the search input if available
   */
  initialValue?: string;
  /**
   * The onSearch function that gets triggered input value changes
   */
  onSearch?: (searchText: string) => void;
  /**
   * The value of the debounce delay
   */
  debounceTime?: number;
}
