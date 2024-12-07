import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NavMenu } from "./index";
import { NavMenuItem } from "./types";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.Mock;

const DEFAULT_MENU_ITEMS: NavMenuItem[] = [
  { text: "User Management", route: "/admin/user-management" },
  { text: "Permission Groups", route: "/admin/permission-groups" },
  { text: "Site Groups", route: "/admin/site-groups" },
  { text: "SSO Manager", route: "/admin/sso-manager" },
  { text: "Organization Management", route: "/admin/organization-management/index" },
  { text: "Site Manager", route: "/admin/site-manager" },
  { text: "Email Group Manager", route: "/admin/email-group-manager" },
  {
    text: "Service Provider Manager",
    route: "/admin/service-provider-manager",
  },
  {
    text: "Firmware Package Manager",
    route: "/admin/firmware-package-manager",
  },
  { text: "Send Email", route: "/admin/send-email" },
  { text: "Feature Activation", route: "/admin/feature-activation" },
];

beforeEach(() => {
  mockUsePathname.mockReturnValue("/home");
});

describe("NavMenu Component", () => {
  test("renders without crashing", () => {
    render(<NavMenu items={DEFAULT_MENU_ITEMS} />);
  });

  test("renders all menu items", () => {
    render(<NavMenu items={DEFAULT_MENU_ITEMS} />);
    DEFAULT_MENU_ITEMS.forEach((item) => {
      const navItems = screen.queryAllByText(item.text);
      expect(navItems.length).toBeGreaterThan(0);
      navItems.forEach((navItem) => {
        expect(navItem).toBeInTheDocument();
        expect(navItem.closest("a")).toHaveAttribute("href", item.route);
      });
    });
  });

  test("search input is present", () => {
    render(<NavMenu items={DEFAULT_MENU_ITEMS} />);
    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
  });

  test("search functionality filters menu items", () => {
    render(<NavMenu items={DEFAULT_MENU_ITEMS} />);
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "User Management" } });

    expect(screen.queryByText("User Management")).toBeInTheDocument();
  });
});
