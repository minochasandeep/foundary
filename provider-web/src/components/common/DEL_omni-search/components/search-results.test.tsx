import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import SearchResults from "./search-results";
import type { SearchResponse } from "../types";

describe("SearchResults Component", () => {
  const mockSetSearchResults = jest.fn();
  const mockGoToResult = jest.fn();
  const mockSearchResults = [
    {
      results: [
        { id: 0, name: "Result 1", type: "organization" },
        { id: 1, name: "Result 2", type: "organization" },
        { id: 2, name: "Result 3", type: "organization" },
        { id: 3, name: "Result 4", type: "organization" },
        { id: 4, name: "Result 5", type: "organization" },
        { id: 5, name: "Result 6", type: "organization" },
        { id: 6, name: "Result 7", type: "organization" },
        { id: 7, name: "Result 8", type: "organization" },
        { id: 8, name: "Result 9", type: "organization" },
        { id: 9, name: "Result 10", type: "organization" },
      ],
      limit: 5,
      offset: 0,
      total_results: 10,
    },
  ] as SearchResponse[];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search results correctly", () => {
    render(
      <SearchResults
        searchResults={mockSearchResults}
        size={0}
        setSearchResults={mockSetSearchResults}
        goToResult={mockGoToResult}
        setSize={jest.fn()}
      />,
    );
    const resultItems = screen.getAllByRole("listitem");
    expect(resultItems).toHaveLength(mockSearchResults[0].total_results);
    expect(screen.getByText("Result 1")).toBeInTheDocument();
    expect(screen.getByText("Result 2")).toBeInTheDocument();
    expect(screen.getByText("Result 3")).toBeInTheDocument();
    expect(screen.getByText("Result 4")).toBeInTheDocument();
    expect(screen.getByText("Result 5")).toBeInTheDocument();
  });

  it("calls goToResult when a result is clicked", async () => {
    render(
      <SearchResults
        searchResults={mockSearchResults}
        size={0}
        setSearchResults={mockSetSearchResults}
        goToResult={mockGoToResult}
        setSize={jest.fn()}
      />,
    );
    const resultItem = screen.getByText("Result 1");
    fireEvent.click(resultItem);
    await waitFor(() => {
      expect(mockGoToResult).toHaveBeenCalledWith(
        mockSearchResults[0].results[0],
      );
    });
  });

  it("does not render when there are no search results", () => {
    render(
      <SearchResults
        searchResults={[]}
        size={0}
        setSearchResults={mockSetSearchResults}
        goToResult={mockGoToResult}
        setSize={jest.fn()}
      />,
    );
    const resultItems = screen.queryAllByRole("listitem");
    expect(resultItems).toHaveLength(0);
  });

  it("renders a message when there are no search results", () => {
    render(
      <SearchResults
        searchResults={[
          {
            total_results: 0,
            results: [],
            limit: 0,
            offset: 0,
          },
        ]}
        size={0}
        setSearchResults={mockSetSearchResults}
        goToResult={mockGoToResult}
        setSize={jest.fn()}
      />,
    );
    expect(screen.getByText("No Results Found")).toBeInTheDocument();
  });

  it("renders a load more button when there are more results", () => {
    render(
      <SearchResults
        searchResults={[
          {
            total_results: 10,
            results: mockSearchResults[0].results,
            limit: 5,
            offset: 0,
          },
        ]}
        size={0}
        setSearchResults={mockSetSearchResults}
        goToResult={mockGoToResult}
        setSize={jest.fn()}
      />,
    );
    expect(screen.getByText("Load more")).toBeInTheDocument();
  });

  it("calls setSearchResults with null when clear all is clicked", () => {
    render(
      <SearchResults
        searchResults={mockSearchResults}
        size={0}
        setSearchResults={mockSetSearchResults}
        goToResult={mockGoToResult}
        setSize={jest.fn()}
      />,
    );
    const clearAllButton = screen.getByText("Clear All");
    fireEvent.click(clearAllButton);
    expect(mockSetSearchResults).toHaveBeenCalledWith(null);
  });

  it("shows more results when load more is clicked", async () => {
    const setSizeMock = jest.fn();
    render(
      <SearchResults
        searchResults={[
          {
            total_results: 10,
            results: mockSearchResults[0].results.slice(0, 5),
            limit: 5,
            offset: 0,
          },
        ]}
        size={0}
        setSearchResults={mockSetSearchResults}
        goToResult={mockGoToResult}
        setSize={setSizeMock}
      />,
    );
    const loadMoreButton = screen.getByText("Load more");
    fireEvent.click(loadMoreButton);
    await waitFor(() => {
      expect(setSizeMock).toHaveBeenCalledWith(5);
    });
  });
});
