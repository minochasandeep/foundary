import React from "react";

// Mock IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    root = null;
    rootMargin = "";
    thresholds = [];
    takeRecords() {
      return [];
    }
  };
});

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import * as SWR from "swr";

import UserManagementLayout from "./layout";
import UserManagementPage from "./page";

const mockData = {
  items: [
    {
      id: 1,
      email: "Tessi_Herma24114@plan-muscat.info",
      firstName: "Amelia",
      lastName: "Walker",
      externalAuthId: "facebook|104567890",
      externalAuthProvider: "Slack OAuth2: slack_1234567890",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 2,
      email: "Brian_Bauch32618@cruelinch.biz",
      firstName: "Abigail",
      lastName: "King",
      externalAuthId: "facebook|104567890",
      externalAuthProvider: "WeChat Open Platform: wechat_open_1234567890",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 3,
      email: "Willa.Kuval50809@pointedrainy.org",
      firstName: "Mason",
      lastName: "Martin",
      externalAuthId: "facebook|10567890",
      externalAuthProvider: "Microsoft Live: mslive_1234567890",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 4,
      email: "Prude_Hirth66207@agilecolt.net",
      firstName: "Ava",
      lastName: "Smith",
      externalAuthId: "facebook|103456789",
      externalAuthProvider: "Yahoo Japan ID: yhjp_1234567890",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 5,
      email: "Jeane_Mante39233@goldenathlete.com",
      firstName: "Noah",
      lastName: "Allen",
      externalAuthId: "facebook|103456789",
      externalAuthProvider: "Auth0: auth0_1234567890",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 6,
      email: "Kaily_Ernse14776@alertdelivery.info",
      firstName: "Sophia",
      lastName: "Robinson",
      externalAuthId: "facebook|104567890",
      externalAuthProvider: "Slack OAuth2: slack_1234567890",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 7,
      email: "Sydni_Carte26123@forgo-speaker.biz",
      firstName: "Riley",
      lastName: "Green",
      externalAuthId: "facebook|103456789",
      externalAuthProvider: "Microsoft Graph: msgraph_1234567890",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 8,
      email: "Jonat_McDer40843@serveherb.com",
      firstName: "Elijah",
      lastName: "Lopez",
      externalAuthId: "facebook|104567890",
      externalAuthProvider: "Yandex OAuth2: yandex_1234567890",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 9,
      email: "Ludie_Frami42632@ship-octagon.info",
      firstName: "Lucas",
      lastName: "Scott",
      externalAuthId: "facebook|103456789",
      externalAuthProvider: "Weibo OAuth2: wb_1234567890",
      isActive: true,
      isDeleted: false,
    },
    {
      id: 10,
      email: "Ocean_Gulgo75237@vastdrinking.org",
      firstName: "James",
      lastName: "Williams",
      externalAuthId: "facebook|104567890",
      externalAuthProvider: "Google Workspace: google_workspace_1234567890",
      isActive: true,
      isDeleted: false,
    },
  ],
  total: 23,
  currentPage: 1,
  totalPages: 3,
  pageSize: 10,
};

describe("User Management Layout", () => {
  it("renders without errors", () => {
    jest.spyOn(SWR, "default").mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
      isValidating: false,
      mutate: jest.fn(),
    }));
    render(
      <UserManagementLayout>
        <></>
      </UserManagementLayout>,
    );
  });

  it("renders elements of page", () => {
    render(
      <UserManagementLayout>
        <></>
      </UserManagementLayout>,
    );
    const buttonElement = screen.getByTestId("create-new-button");
    const fullName = screen.getByText("Full name");
    expect(buttonElement).toBeInTheDocument();
    expect(fullName).toBeInTheDocument();
    // check sort
    fireEvent.click(fullName);
  });

  it("triggers search functionality when the value is changed", () => {
    const mockPush = jest.fn();
    jest.mock("next/navigation", () => {
      return {
        __esModule: true,
        usePathname: () => ({
          pathname: "/admin/user-management",
        }),
        useRouter: () => ({
          push: mockPush,
          replace: jest.fn(),
          prefetch: jest.fn(),
        }),
        useSearchParams: () => ({
          get: jest.fn((key) => {
            if (key === "orderBy") return null;
            if (key === "order") return null;
            if (key === "search") return "Ava";
            return null;
          }),
          forEach: () => {},
        }),
      };
    });
    render(
      <UserManagementLayout>
        <></>
      </UserManagementLayout>,
    );
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, {
      target: { value: "Ava" },
    });
    // expect(mockPush).toHaveBeenCalledWith("/admin/user-management?search=Ava");
  });

  // it("triggers filter functionality when the value is changed", async () => {
  //   render(
  //     <UserManagementLayout>
  //       <></>
  //     </UserManagementLayout>,
  //   );
  //   const buttonElement = screen.getByLabelText("Show filters");
  //   expect(buttonElement).toBeInTheDocument();
  //   buttonElement.click();
  //   const filterPopup = await screen.findByRole("tooltip");
  //   expect(filterPopup).toBeVisible();
  //   // need to change the value of filter popup value field and then expect the push to be called
  // });

  it("renders user management page", () => {
    render(<UserManagementPage />);
  });
});
