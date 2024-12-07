import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Input,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import { FilterChips, SearchResults, RecentSearches } from "./components";
import { useSearch, useChipManagement, useNavigation } from "./hooks";
import { useTheme } from "@mui/material";

interface OmniSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function OmniSearch(props: OmniSearchProps) {
  const theme = useTheme();
  const {
    chipData,
    filters,
    handleChipClick,
    handleFilterDelete,
    setChipData,
    setFilters,
    chipDataRef,
    filtersRef,
  } = useChipManagement();
  const {
    searchValue,
    setSearchValue,
    searchResults,
    setRecentSearches,
    getFilteredRecentSearches,
    setSearchResults,
    size,
    setSize,
  } = useSearch(filters);
  const { setSelectedResult } = useNavigation(props.setOpen);

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: "16px",
          backgroundColor: theme.palette.background.default,
        },
      }}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-start",
        },
      }}
      maxWidth="xl"
      fullWidth={true}
      open={props.open}
      onClose={() => props.setOpen(!props.open)}
    >
      <DialogContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          borderRadius="32px"
          alignItems="center"
          width="100%"
          gap="8px"
        >
          <Box
            display="flex"
            flexDirection="row"
            width="100%"
            sx={{
              border: `1px solid ${isDarkMode ? theme.palette.grey[700] : theme.palette.grey[300]}`,
              ":hover": {
                border: `1px solid ${theme.palette.primary.main}`,
              },
              borderRadius: "32px",
              alignItems: "center",
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {filters.map((data) => {
                return (
                  <Chip
                    key={data.key}
                    label={data.label}
                    variant="filled"
                    onDelete={() => handleFilterDelete(data)}
                    deleteIcon={<ClearIcon />}
                    sx={{
                      backgroundColor: "#0F3CFF26",
                      color: theme.palette.primary.light,
                      margin: "2px",
                    }}
                  />
                );
              })}
            </Box>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.currentTarget.value)}
              placeholder="Search"
              disableUnderline={true}
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: "32px",
                padding: "8px",
              }}
              fullWidth={true}
            />
            <Box
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                minWidth: "40px",
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "8px",
              }}
            >
              <SearchIcon />
            </Box>
          </Box>
          <DialogActions
            sx={{ display: "flex", alignItems: "center", padding: "0" }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                minWidth: "40px",
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
              }}
              onClick={() => {
                setSearchValue("");
                setChipData([...filtersRef.current, ...chipDataRef.current]);
                setFilters([]);
              }}
            >
              <CloseIcon />
            </Button>
          </DialogActions>
        </Box>
        <FilterChips chipData={chipData} handleChipClick={handleChipClick} />
        <SearchResults
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          goToResult={setSelectedResult}
          size={size}
          setSize={setSize}
        />
        <RecentSearches
          recentSearches={getFilteredRecentSearches()}
          setRecentSearches={setRecentSearches}
          goToResult={setSelectedResult}
        />
      </DialogContent>
    </Dialog>
  );
}
