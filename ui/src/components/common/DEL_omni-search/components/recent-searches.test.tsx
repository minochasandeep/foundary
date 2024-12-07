import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import RecentSearches from "./recent-searches";
import { type RecentSearch, SearchType } from "../types";

describe("RecentSearches Component", () => {
  const mockRecentSearches: RecentSearch[] = [
    {
      id: 1,
      result: { id: 1, name: "Search 1", type: SearchType.ORGANIZATION },
    },
    {
      id: 2,
      result: { id: 2, name: "Search 2", type: SearchType.ORGANIZATION },
    },
  ];
  const mockSetRecentSearches = jest.fn();
  const mockGoToResult = jest.fn();

  it("renders recent searches correctly", () => {
    render(
      <RecentSearches
        recentSearches={mockRecentSearches}
        setRecentSearches={mockSetRecentSearches}
        goToResult={mockGoToResult}
      />,
    );
    expect(screen.getByText("Recent Searches")).toBeInTheDocument();
    expect(screen.getByText("Search 1")).toBeInTheDocument();
    expect(screen.getByText("Search 2")).toBeInTheDocument();
  });

  it("calls goToResult when a recent search is clicked", async () => {
    render(
      <RecentSearches
        recentSearches={mockRecentSearches}
        setRecentSearches={mockSetRecentSearches}
        goToResult={mockGoToResult}
      />,
    );
    fireEvent.click(screen.getByText("Search 1"));
    await waitFor(() => {
      expect(mockGoToResult).toHaveBeenCalledWith(mockRecentSearches[0].result);
    });
  });

  it("clears recent searches when Clear All button is clicked", async () => {
    render(
      <RecentSearches
        recentSearches={mockRecentSearches}
        setRecentSearches={mockSetRecentSearches}
        goToResult={mockGoToResult}
      />,
    );
    fireEvent.click(screen.getByText("Clear All"));
    await waitFor(() => {
      expect(mockSetRecentSearches).toHaveBeenCalledWith([]);
    });
  });

  it("does not render when there are no recent searches", () => {
    render(
      <RecentSearches
        recentSearches={[]}
        setRecentSearches={mockSetRecentSearches}
        goToResult={mockGoToResult}
      />,
    );
    expect(screen.queryByText("Recent Searches")).not.toBeInTheDocument();
  });

  it("Removes a specific recent search", async () => {
    const updatedRecentSearches = [
      {
        id: 2,
        result: { id: 2, name: "Search 2", type: SearchType.ORGANIZATION },
      },
    ];
    render(
      <RecentSearches
        recentSearches={mockRecentSearches}
        setRecentSearches={mockSetRecentSearches}
        goToResult={mockGoToResult}
      />,
    );
    const removeButtons = screen.getAllByTestId("delete-search-button");
    fireEvent.click(removeButtons[0]);
    await waitFor(() => {
      expect(mockSetRecentSearches).toHaveBeenCalledWith(updatedRecentSearches);
    });
  });
});
