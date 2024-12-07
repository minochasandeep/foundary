/**
 * This file sets up global mocks before each test.
 */


jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    usePathname: () => ({
      pathname: "",
    }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => { },
      forEach: () => { },
    }),
    useParams: jest.fn(),
  };
});

jest.mock("next-auth/react", () => ({
  useSession() {
    return [false, false];
  },
}));



jest.mock("next-intl", () => ({
  useTranslations() {
    return (key: string) => key;
  },
}));