import React from "react";

// material-ui imports
import Box from "@mui/material/Box";

// local imports
import { ListviewTopbarProps } from "./types";
import { SearchInput } from "@/components/common/search-input";
import { Button } from "@/components/core/button";
import { useTranslations } from "next-intl";

const ListviewTopbar: React.FC<ListviewTopbarProps> = ({
  onCreate,
  onSearch,
  searchPlaceholder,
  searchQuery,
  createButtonProps,
  ...restProps
}) => {
  const t = useTranslations("ListviewTopbar");
  const { sx: boxSx, ...boxProps } = restProps || {};

  const { sx: createButtonSx, ...createButtonRestProps } =
    createButtonProps || {};

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      gap={1}
      sx={{ px: 1, py: 1, height: 48, ...boxSx }}
      {...boxProps}
    >
      {onSearch && (
        <SearchInput
          value={searchQuery}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
        />
      )}
      {onCreate && (
        <>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            title={t("createNew")}
            onClick={onCreate}
            size="medium"
            sx={{ minWidth: "140px", borderRadius:"5px", ...createButtonSx }}
            data-testid="create-new-button"
            {...createButtonRestProps}
          />
        </>
      )}
    </Box>
  );
};

export default ListviewTopbar;
