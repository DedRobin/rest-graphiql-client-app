import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import dotenv from "dotenv";
import Login from "@/app/(main)/login/client";

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

describe("<Login />", () => {
  test("<Login /> should be in the document", () => {
    render(<Login user={null} />);
    expect(screen.getByText(/Please Login/i)).toBeInTheDocument();
  });
});
