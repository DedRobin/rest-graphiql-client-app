import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(main)/page";

vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: vi
    .fn()
    .mockImplementationOnce(() => [null, false])
    .mockImplementationOnce(() => [null, true]),
}));

describe("<MainPage />", () => {
  test("<MainPage /> should be in the document (when user is authenticated)", () => {
    render(<HomePage />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
  test("<MainPage /> should be in the document (while is loading)", () => {
    render(<HomePage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
