import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import ChipFilters from "./chip-filters";
import type { ChipData } from "../types";

describe("ChipFilters Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders filter chips correctly", () => {
    const mockChipData: ChipData[] = [
      { key: 1, label: "Filter 1", type: "organization" },
      { key: 2, label: "Filter 2", type: "organization" },
    ];
    render(<ChipFilters chipData={mockChipData} handleChipClick={jest.fn()} />);
    expect(screen.getByText("Filter By")).toBeInTheDocument();
  });

  it("renders no chips when chipData is empty", () => {
    render(<ChipFilters chipData={[]} handleChipClick={jest.fn()} />);
    expect(screen.queryByText("Filter By")).not.toBeInTheDocument();
  });

  it("calls handleChipClick when a chip is clicked", async () => {
    const mockChipData: ChipData[] = [
      { key: 1, label: "Filter 1", type: "organization" },
      { key: 2, label: "Filter 2", type: "organization" },
    ];
    const handleChipClick = jest.fn();
    render(
      <ChipFilters chipData={mockChipData} handleChipClick={handleChipClick} />,
    );
    fireEvent.click(screen.getByText("Filter 1"));
    expect(screen.getByText("Filter 1")).toBeInTheDocument();
    expect(screen.getByText("Filter 2")).toBeInTheDocument();
    expect(handleChipClick).toHaveBeenCalled();
  });
});
