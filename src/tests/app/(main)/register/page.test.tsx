import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RegisterPage from "@/app/(main)/register/page";
// import { useAuthState } from "@/tests/mocks/firebase";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));
vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: vi
    .fn()
    .mockImplementationOnce(() => [null, false])
    .mockImplementationOnce(() => [null, true]),
}));

describe("<RegisterPage />", () => {
  test("<RegisterPage /> should be in the document (when user is authenticated)", () => {
    render(<RegisterPage />);
    expect(screen.getByText(/Registration/i)).toBeInTheDocument();
  });

  test("<RegisterPage /> should be in the document (while is loading)", () => {
    render(<RegisterPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
