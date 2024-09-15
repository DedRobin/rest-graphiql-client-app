import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import dotenv from "dotenv";
import Register from "@/app/(main)/register/client";

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

describe("<Register />", () => {
  test("<Register /> should be in the document (when user is authenticated)", () => {
    render(<Register />);
    expect(screen.getByText(/Please Register/i)).toBeInTheDocument();
  });
});
