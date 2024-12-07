import { Box, Chip, ListItem, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/material";
import type { ChipData } from "../types";

interface FilterChipsProps {
  chipData: ChipData[];
  handleChipClick: (data: ChipData) => void;
}

export default function FilterChips(props: FilterChipsProps) {
  const theme = useTheme();

  if (props.chipData.length === 0) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" gap="4px">
      <Typography variant="h1" fontSize={18}>
        Filter By
      </Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap="4px">
        {props.chipData.map((data) => {
          return (
            <ListItem key={data.key} sx={{ padding: "0", width: "auto" }}>
              <Chip
                label={data.label}
                variant="filled"
                onClick={() => {
                  props.handleChipClick(data);
                }}
                deleteIcon={<ClearIcon />}
                sx={{
                  maxWidth: "200px",
                  margin: "2px",
                  backgroundColor: "#0F3CFF26",
                  color: theme.palette.primary.light,
                }}
              />
            </ListItem>
          );
        })}
      </Box>
    </Box>
  );
}
