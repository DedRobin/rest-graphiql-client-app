import { PasswordInput } from "@/components/UI/Inputs/PasswordInput/PasswordInput";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

// Mock the register function
const mockRegister = vi.fn(() => ({
  ref: vi.fn(), // Mock the ref function
  onChange: vi.fn(),
  onBlur: vi.fn(),
  name: "password", // Mock the name property
  value: "", // Mock the value property
}));

describe("<PasswordInput />", () => {
  test("renders label if provided", () => {
    render(<PasswordInput label="Password" register={mockRegister()} />);
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("renders placeholder if provided", () => {
    render(
      <PasswordInput
        placeholder="Enter your password"
        register={mockRegister()}
      />,
    );
  });

  test("displays error message if provided", () => {
    render(
      <PasswordInput error="Invalid password" register={mockRegister()} />,
    );
    expect(screen.getByText(/Invalid password/i)).toBeInTheDocument();
  });

  test("toggles password visibility on button click", () => {
    render(<PasswordInput register={mockRegister()} />);

    const showButton = screen.getByLabelText(/Show password/i);

    // Click the button to show password
    fireEvent.click(showButton);

    // Click the button to hide password
    fireEvent.click(showButton);
  });

  test("disables input when disabled prop is true", () => {
    render(<PasswordInput disabled={true} register={mockRegister()} />);
  });

  test("does not render toggle button when disabled", () => {
    render(<PasswordInput disabled={true} register={mockRegister()} />);
    expect(screen.queryByLabelText(/Show password/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Hide password/i)).not.toBeInTheDocument();
  });
});
