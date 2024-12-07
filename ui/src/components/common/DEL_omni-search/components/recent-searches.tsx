import { Close } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { Box, Button, IconButton, ListItem, Typography } from "@mui/material";
import type { SearchResult, RecentSearch } from "../types";

interface RecentSearchesProps {
  recentSearches: RecentSearch[];
  setRecentSearches: (searches: RecentSearch[]) => void;
  goToResult: (result: SearchResult) => void;
}

export default function SearchResults(props: RecentSearchesProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  if (props.recentSearches.length === 0) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" gap="4px">
      <Box
        display="flex"
        flexDirection="row"
        gap="4px"
        justifyContent="space-between"
      >
        <Typography fontSize={18} color={theme.palette.text.primary}>
          Recent Searches
        </Typography>
        <Button
          variant="text"
          onClick={() => {
            props.setRecentSearches([]);
            localStorage.setItem(
              "recentSearches",
              JSON.stringify(props.recentSearches),
            );
          }}
          sx={{ textTransform: "none", color: theme.palette.text.primary }}
        >
          Clear All
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap="4px">
        {props.recentSearches.map((search) => {
          return (
            <ListItem
              key={search.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Box
                onClick={() => {
                  props.goToResult(search.result);
                }}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  ":hover": {
                    backgroundColor: isDarkMode ? "#ffffff1a" : "#0000000D",
                  },
                }}
              >
                <Box display="flex" flexDirection="column">
                  <Typography
                    align="left"
                    fontSize={16}
                    fontWeight="bold"
                    color={theme.palette.text.primary}
                  >
                    {search.result.name}
                  </Typography>
                  <Typography
                    align="left"
                    variant="body2"
                    fontSize={14}
                    color={theme.palette.text.secondary}
                  >
                    {search.result.type}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                data-testid="delete-search-button"
                onClick={() => {
                  props.setRecentSearches(
                    props.recentSearches.filter(
                      (item) => item.result.name !== search.result.name,
                    ),
                  );
                }}
              >
                <Close />
              </IconButton>
            </ListItem>
          );
        })}
      </Box>
    </Box>
  );
}
