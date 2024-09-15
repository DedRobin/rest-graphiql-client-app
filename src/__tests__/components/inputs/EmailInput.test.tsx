import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EmailInput } from "@/components/UI/Inputs/EmailInput/EmailInput";

describe("EmailInput", () => {
  it("should render the EmailInput component with label, placeholder, and value", () => {
    const mockOnChange = vi.fn();

    render(
      <EmailInput
        label="Email"
        placeholder="Enter your email"
        value="test@example.com"
        onChange={mockOnChange}
        error="Email is required"
        disabled={false}
        register={{
          name: "email",
          onChange: mockOnChange,
          onBlur: vi.fn(),
          ref: vi.fn(),
        }} // Mock `register` function
      />,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("should render the EmailInput component without label and error", () => {
    const mockOnChange = vi.fn();

    render(
      <EmailInput
        value="test@example.com"
        onChange={mockOnChange}
        register={{
          name: "email",
          onChange: mockOnChange,
          onBlur: vi.fn(),
          ref: vi.fn(),
        }} // Mock `register` function
      />,
    );

    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  it("should render the EmailInput component with disabled state", () => {
    const mockOnChange = vi.fn();

    render(
      <EmailInput
        value="test@example.com"
        onChange={mockOnChange}
        disabled={true}
        register={{
          name: "email",
          onChange: mockOnChange,
          onBlur: vi.fn(),
          ref: vi.fn(),
        }} // Mock `register` function
      />,
    );

    expect(screen.getByDisplayValue("test@example.com")).toBeDisabled();
  });
});
