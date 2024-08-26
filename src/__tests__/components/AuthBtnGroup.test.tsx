import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import AuthBtnGroup from "@/components/AuthBtnGroup";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn().mockImplementation(() => ({
    push: vi.fn(),
  })),
}));
vi.mock("react-firebase-hooks/auth", () => ({
  useAuthState: vi
    .fn()
    .mockImplementationOnce(() => [null])
    .mockImplementationOnce(() => [
      {
        uid: "foo",
        email: "foo@example.com",
      },
    ]),
}));

describe("<AuthBtnGroup />", () => {
  test("<AuthBtnGroup /> should be in the document (when user is not authenticated)", () => {
    render(<AuthBtnGroup />);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });
  test("<AuthBtnGroup /> should be in the document (when user is authenticated)", () => {
    render(<AuthBtnGroup />);
    const logoutBtn = screen.getByText(/Log out/i);
    expect(logoutBtn).toBeInTheDocument();

    fireEvent.click(logoutBtn);
    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
  });
});
