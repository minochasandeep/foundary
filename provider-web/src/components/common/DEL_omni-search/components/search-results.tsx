import { Box, Button, ListItem, Typography } from "@mui/material";
import type { SearchResponse, SearchResult } from "../types";
import { ChevronRight } from "@mui/icons-material";
import { useTheme } from "@mui/material";

function NoResultsFound() {
  return (
    <Box display="flex" flexDirection="column" gap="4px">
      <Typography fontSize={18}>No Results Found</Typography>
    </Box>
  );
}

interface SearchResultsProps {
  searchResults: SearchResponse[] | null;
  setSearchResults: (results: SearchResponse[] | null) => void;
  goToResult: (result: SearchResult) => void;
  size: number;
  setSize: (size: number) => void;
}
export default function SearchResults(props: SearchResultsProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  if (!props.searchResults) return null;

  if (props.searchResults?.length === 0) {
    return <NoResultsFound />;
  } else if (props.searchResults.length === 1) {
    if (props.searchResults[0].results.length === 0) {
      return <NoResultsFound />;
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap="4px">
      <Box
        display="flex"
        flexDirection="row"
        gap="4px"
        justifyContent="space-between"
      >
        <Typography fontSize={18}>Search Results</Typography>
        <Button
          variant="text"
          onClick={() => {
            props.setSearchResults(null);
          }}
          sx={{ textTransform: "none" }}
        >
          Clear All
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap="4px" overflow="auto">
        {props.searchResults.length &&
          props.searchResults
            .flatMap((res) => res.results)
            .map((result) => {
              return (
                <ListItem
                  key={result.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 16px",
                  }}
                >
                  <Box
                    onClick={() => {
                      props.goToResult(result);
                    }}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      ":hover": {
                        backgroundColor: isDarkMode
                          ? theme.palette.action.hover
                          : theme.palette.action.selected,
                      },
                    }}
                  >
                    <Box display="flex" flexDirection="column">
                      <Typography align="left" fontSize={16} fontWeight="bold">
                        {result.name}
                      </Typography>
                      <Typography
                        align="left"
                        variant="body2"
                        fontSize={14}
                        color="textSecondary"
                      >
                        {result.type}
                      </Typography>
                    </Box>
                    <ChevronRight />
                  </Box>
                </ListItem>
              );
            })}
        {props.searchResults.length > 0 &&
          props.size < props.searchResults[0].total_results && (
            <Button
              onClick={() => {
                props.setSize(props.size + 5);
              }}
            >
              Load more
            </Button>
          )}
      </Box>
    </Box>
  );
}
