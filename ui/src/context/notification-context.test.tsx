import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

import { NotificationProvider } from "./notification-context";
import { Typography } from "@mui/material";

describe("Notification context", () => {
  it("renders correctly", () => {
    render(
      <NotificationProvider>
        <Typography>Test</Typography>
      </NotificationProvider>,
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
