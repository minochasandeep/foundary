import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

import  { TimezonePreferencesProvider }  from "./timezone-context";
import { Typography } from "@mui/material";

describe("TimeZone context", () => {
  it("renders correctly", () => {
    render(
      <TimezonePreferencesProvider>
        <Typography>Test</Typography>
      </TimezonePreferencesProvider>,
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});