import React from "react";

// material-ui imports
import Box from "@mui/material/Box";
import { GridSlots, DataGridPro as MuiDataGrid } from "@mui/x-data-grid-pro";

// local imports
import { DataGridProps } from "./types";
import DataGridToolbar from "./datagrid-toolbar";
import { getDataGridOperators } from "@/utils/query-helpers/query.helpers";
import ListviewTopbar from "@/components/common/listview-topbar/listview-topbar";
import { useTranslations } from "next-intl";
import { LinearProgress } from "@mui/material";
import "./datagrid.css";
const DataGrid: React.FC<DataGridProps> = ({
  dataGridContainerProps,
  selectedRowId,
  columns,
  rows,
  rowCount,
  page,
  pageSize,
  onPageChanged,
  onPageSizeChanged,
  topbarProps,
  toolbarProps,
  hideTopBar = false,
  infiniteScroll = false,
  ...restProps
}) => {
  const { sx: dataGridSx, ...dataGridProps } = restProps || {};
  // const [selectedRow, setSelectedRow] = React.useState<string | number | null>(null);
  const t = useTranslations("DataGrid");

  const columnWithFilters = React.useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        filterOperators: getDataGridOperators(col.type || ""),
      })),
    [columns],
  );

  // Function to handle right-click event
  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        padding: "8px",
      }}
      {...dataGridContainerProps}
      onContextMenu={handleContextMenu}
    >
      {!hideTopBar && <ListviewTopbar {...topbarProps} />}
      <MuiDataGrid
        initialState={{
          pagination: infiniteScroll
            ? undefined
            : {
                paginationModel: {
                  pageSize: pageSize || 10,
                  // subtract -1 from page because the pagination starts from 0
                  page: page && page > 0 ? page - 1 : 0,
                },
              },
        }}
        pageSizeOptions={infiniteScroll ? undefined : [5, 10, 25]}
        slots={{
          toolbar: () =>
            DataGridToolbar(
              toolbarProps?.hideFilterButton,
              toolbarProps?.hideColumnButton,
            ),
          loadingOverlay: infiniteScroll
            ? (LinearProgress as GridSlots["loadingOverlay"])
            : undefined,
        }}
        sx={{
          backgroundColor: "background.paper",
          ...dataGridSx,
        }}
        checkboxSelection={false}
        {...dataGridProps}
        hideFooterPagination={infiniteScroll}
        scrollEndThreshold={200}
        rows={rows}
        columns={columnWithFilters}
        pagination={!infiniteScroll}
        sortingMode="server"
        filterMode="server"
        paginationMode="server"
        getRowClassName={(params) =>
          params.id === selectedRowId ? "highlight-row" : ""
        }
        rowCount={rowCount}
        paginationModel={
          infiniteScroll
            ? undefined
            : {
                pageSize: pageSize || 10,
                // subtract -1 from page because the pagination starts from 0
                page: page && page > 0 ? page - 1 : 0,
              }
        }
        onPaginationModelChange={(params) => {
          // handle page change
          if (!infiniteScroll) {
            const uPage = params.page + 1;
            const uPageSize = params.pageSize;
            if (onPageChanged && uPage !== page) {
              onPageChanged(uPage);
            }
            // handle page size change
            if (onPageSizeChanged && pageSize !== uPageSize) {
              onPageSizeChanged(uPageSize);
            }
          }
        }}
        localeText={{
          toolbarColumns: t("columns"),
          toolbarFilters: t("filters"),
        }}
      />
    </Box>
  );
};

export default DataGrid;
