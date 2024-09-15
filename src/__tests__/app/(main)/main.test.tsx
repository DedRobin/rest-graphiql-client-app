import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import dotenv from "dotenv";
import { Home } from "@/app/(main)/client";

dotenv.config();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: vi.fn(),
}));
vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: vi
    .fn()
    .mockImplementationOnce(() => [null, false])
    .mockImplementationOnce(() => [null, true]),
}));

vi.mock("next/font/google", () => ({
  Pixelify_Sans: vi.fn(() => ({ subsets: ["latin"] })),
}));

describe("<Home />", () => {
  test("<Home /> should be in the document", () => {
    render(<Home />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});
