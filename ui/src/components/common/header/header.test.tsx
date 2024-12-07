import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./header";
import { SWRConfig } from "swr";

jest.mock("../omni-search/hooks/use-search", () => ({
  useSearch: () => ({
    searchValue: "",
    setSearchValue: jest.fn(),
    searchResults: [],
    setRecentSearches: jest.fn(),
    getFilteredRecentSearches: jest.fn().mockReturnValue([]),
    setSearchResults: jest.fn(),
    size: 0,
    setSize: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  usePathname: () => "/admin/permissions-group",
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn((key) => {
      if (key === "search") return "Ava";
      return null;
    }),
    forEach: () => {},
  }),
  useParams: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("Header component", () => {
  const HEADER_DATA = [
    { name: "Sites Overview", url: "/sites-overview" },
    { name: "Refrigeration", url: "/" },
    { name: "HVAC", url: "/hvac" },
    { name: "EnergyESG", url: "/energy-esg" },
    { name: "Admin", url: "/admin/user-management" },
  ];

  it("renders the logo", async () => {
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
          <Header />
        </SWRConfig>,
      );
    });

    const logo = await screen.findByAltText("Foundary");
    expect(logo).toBeInTheDocument();
  });

  it("renders all navigation items with correct labels and links", async () => {
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
          <Header />
        </SWRConfig>,
      );
    });

    HEADER_DATA.forEach((item) => {
      const navItems = screen.queryAllByText(item.name);
      navItems.forEach((navItem) => {
        expect(navItem).toBeInTheDocument();
        expect(navItem.closest("a")).toHaveAttribute("href", item.url);
      });
    });
  });

  it("renders the account menu", async () => {
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
          <Header />
        </SWRConfig>,
      );
    });

    const accountMenu = screen.getByTestId("account-menu-button");
    expect(accountMenu).toBeInTheDocument();
  });

  it("renders the theme toggle button and handles theme change", async () => {
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
          <Header />
        </SWRConfig>,
      );
    });
    const themeToggleButton = screen.getByTestId("theme-toggle-button");
    expect(themeToggleButton).toBeInTheDocument();
  });

  it("renders the search button", async () => {
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
          <Header />
        </SWRConfig>,
      );
    });
    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();
  });
});
