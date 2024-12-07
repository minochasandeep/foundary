import { ListviewTopbarProps } from "@/components/common/listview-topbar/types";
import { BoxProps } from "@mui/material";
import { DataGridProProps as MuiDataGridProps } from "@mui/x-data-grid-pro";

// The `DataGridProps` interface extends MUI's `DataGridProps`.
export interface DataGridProps extends MuiDataGridProps {
  // Optional props for the parent container of the DataGrid
  dataGridContainerProps?: BoxProps;

  // current selected row id
  selectedRowId?:number;

  // Total number of rows/items in paginated list
  rowCount: number;

  // Optional current page number
  page?: number;

  // Optional number of rows/items per page
  pageSize?: number;

  // Optional function that gets triggered when the page changes
  onPageChanged?: (page: number) => void;

  // Optional function that gets triggered when the pageSize changes
  onPageSizeChanged?: (pageSize: number) => void;

  // Optional props for the top bar of the DataGrid
  topbarProps?: ListviewTopbarProps;

  // Optional boolean to control the visibility of the top bar
  hideTopBar?: boolean;

  // Optional boolean to control the functionality of infinite scroll
  infiniteScroll?: boolean;

  // toolbar props
  toolbarProps?: {
    // Optional value that determines if the filter button is hidden
    hideFilterButton?: boolean;

    // Optional value that determines if the colums button is hidden
    hideColumnButton?: boolean;
  };
}
