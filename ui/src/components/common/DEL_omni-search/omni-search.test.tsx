import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { OmniSearch } from "./index";
import { useChipManagement } from "./hooks/use-chip-management";
import { useSearch } from "./hooks/use-search";
import { useNavigation } from "./hooks/use-navigation";

jest.mock("./hooks/use-chip-management");
jest.mock("./hooks/use-search");
jest.mock("./hooks/use-navigation");

describe("OmniSearch Component", () => {
  beforeEach(() => {
    (useChipManagement as jest.Mock).mockReturnValue({
      chipData: [],
      filters: [],
      handleChipClick: jest.fn(),
      handleFilterDelete: jest.fn(),
      setChipData: jest.fn(),
      setFilters: jest.fn(),
      chipDataRef: { current: [] },
      filtersRef: { current: [] },
    });

    (useSearch as jest.Mock).mockReturnValue({
      searchValue: "",
      setSearchValue: jest.fn(),
      searchResults: [],
      setRecentSearches: jest.fn(),
      getFilteredRecentSearches: jest.fn().mockReturnValue([]),
      setSearchResults: jest.fn(),
      size: 0,
      setSize: jest.fn(),
    });

    (useNavigation as jest.Mock).mockReturnValue({
      setSelectedResult: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<OmniSearch open={true} setOpen={jest.fn} />);
  });

  it("renders search input", () => {
    render(<OmniSearch open={true} setOpen={jest.fn} />);
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
  });
});
