import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useTranslations } from "next-intl";

const DataGridToolbar = (
  hideFilterButton: boolean = false,
  hideColumnButton: boolean = false,
) => {
  const t = useTranslations("DataGrid");
  return (
    <GridToolbarContainer
      sx={{
        "& .MuiButtonBase-root": {
          color: "grey.800",
          "&:hover": {
            color: "grey.800",
          },
        },
      }}
    >
      {!hideColumnButton && (
        <GridToolbarColumnsButton
          slotProps={{
            tooltip: {
              title: t("columns"),
              componentsProps: { tooltip: { sx: { bgcolor: "common.black" } } },
            },
          }}
        />
      )}
      {!hideFilterButton && (
        <GridToolbarFilterButton
          slotProps={{
            tooltip: {
              title: t("filters"),
              componentsProps: { tooltip: { sx: { bgcolor: "common.black" } } },
            },
          }}
        />
      )}
      {/* Can use these buttons as required */}
      {/* <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: 'Change density' } }}
        /> */}
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
