import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateControl from "../datecontrol/date-control";
import { DateControlProps } from "./types";

describe("DateControl Component", () => {
  const mockOnFromDateChange = jest.fn(); 
  const mockOnToDateChange = jest.fn(); 

  const mockProps: Partial<DateControlProps> = {
    value: "test-value",
    onFromDateChange: mockOnFromDateChange,
    fromDate: "2023-01-01",
    getTodayDate: () => "2023-01-01",
  };

  beforeEach(() => {
    render(<DateControl {...mockProps} />);
  });

  test("renders without crashing", () => {
    expect(screen.getByLabelText("From")).toBeInTheDocument();
  });

  test("initial state is set correctly", () => {
    expect(screen.getByLabelText("From")).toHaveValue("2023-01-01");
  });

  test("calls onFromDateChange with correct arguments when From date changes", () => {
    fireEvent.change(screen.getByLabelText("From"), { target: { value: "2023-01-02" } });
    expect(mockOnFromDateChange).toHaveBeenCalledWith("test-value", "2023-01-02");
  });

  test("minimum date for From date is set to today", () => {
    expect(screen.getByLabelText("From")).toHaveAttribute("min", "2023-01-01");
  });
});