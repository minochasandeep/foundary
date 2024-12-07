import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import AccountMenu from "../account-menu/account-menu";
import { SWRConfig } from "swr";
import { UnauthorizedError } from "../../../lib/exceptions";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: mockReplace,
      prefetch: jest.fn(),
    }),
  };
});

afterEach(() => {
  cleanup();
});

test("renders the menu button", async () => {
  const fetcher = jest.fn().mockImplementation((url) => {
    if (url === "/users/me") {
      return Promise.resolve({
        firstName: "test",
        lastName: "user",
        sessionOrganizationId: 0,
        sessionOrganizationName: "test org",
      });
    }
  });
  await act(async () => {
    render(
      <SWRConfig value={{ fetcher, dedupingInterval: 0 }}>
        <AccountMenu />
      </SWRConfig>,
    );
  });

  const iconButton = screen.getByTestId("account-menu-button");
  expect(iconButton).toBeInTheDocument();
});

test("opens the menu when button is clicked", async () => {
  const fetcher = jest.fn().mockImplementation((url) => {
    if (url === "/users/me") {
      return Promise.resolve({
        firstName: "test",
        lastName: "user",
        sessionOrganizationId: 0,
        sessionOrganizationName: "test org",
      });
    }
  });
  await act(async () => {
    render(
      <SWRConfig value={{ fetcher, dedupingInterval: 0 }}>
        <AccountMenu />
      </SWRConfig>,
    );
  });

  const button = screen.getByTestId("account-menu-button");
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  const profileMenuItems = screen.getAllByText(/Account Settings/i);
  expect(profileMenuItems.length).toBeGreaterThan(0);
  const profileMenuItem = profileMenuItems[0];
  expect(profileMenuItem).toBeInTheDocument();
});

test("Does not redirect when the username is present", async () => {
  const fetcher = jest.fn().mockImplementation((url) => {
    if (url === "/users/me") {
      return Promise.resolve({
        firstName: "test",
        lastName: "user",
        sessionOrganizationId: 0,
        sessionOrganizationName: "test org",
      });
    }
  });
  await act(async () => {
    render(
      <SWRConfig value={{ fetcher, dedupingInterval: 0 }}>
        <AccountMenu />
      </SWRConfig>,
    );
  });

  await waitFor(() => {
    expect(mockReplace).not.toHaveBeenCalledWith("/403");
  });
});

test("Throws UnauthorizedError when /user/me is undefined", async () => {
  const fetcher = jest.fn().mockImplementation((url) => {
    if (url === "/users/me") {
      return Promise.reject(new UnauthorizedError());
    }
    return Promise.resolve();
  });

  await act(async () => {
    render(
      <SWRConfig value={{ fetcher, dedupingInterval: 0 }}>
        <AccountMenu />
      </SWRConfig>,
    );
  });

  await expect(fetcher("/users/me")).rejects.toThrow(UnauthorizedError);
});
