import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/(main)/login/page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));
vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: vi
    .fn()
    .mockImplementationOnce(() => [null, false])
    .mockImplementationOnce(() => [null, true]),
}));

describe("<LoginPage />", () => {
  test("<LoginPage /> should be in the document (when user is authenticated)", () => {
    render(<LoginPage />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
  test("<LoginPage /> should be in the document (while is loading)", () => {
    render(<LoginPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
