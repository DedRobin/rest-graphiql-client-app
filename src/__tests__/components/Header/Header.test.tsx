import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Header } from "@/components/Header/Header";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: vi.fn(),
}));

describe("<Header />", () => {
  test("renders Header component", () => {
    render(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
