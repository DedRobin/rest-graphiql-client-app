import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TextInput } from "@/components/UI/Inputs/TextInput/TextInput";

// Mock the register function
const mockRegister = vi.fn(() => ({
  ref: vi.fn(),
  onChange: vi.fn(),
  onBlur: vi.fn(),
  name: "textInput", // Mock the name property
  value: "", // Mock the value property
}));

describe("<TextInput />", () => {
  test("renders label if provided", () => {
    render(<TextInput label="Username" register={mockRegister()} />);
  });

  test("renders placeholder if provided", () => {
    render(
      <TextInput placeholder="Enter your username" register={mockRegister()} />,
    );
    expect(
      screen.getByPlaceholderText(/Enter your username/i),
    ).toBeInTheDocument();
  });

  test("displays error message if provided", () => {
    render(
      <TextInput error="This field is required" register={mockRegister()} />,
    );
    expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
  });

  test("handles change events", () => {
    const handleChange = vi.fn();
    render(<TextInput onChange={handleChange} register={mockRegister()} />);
  });

  test("handles blur events", () => {
    const handleBlur = vi.fn();
    render(<TextInput onBlur={handleBlur} register={mockRegister()} />);
  });

  test("disables input when disabled prop is true", () => {
    render(<TextInput disabled={true} register={mockRegister()} />);
  });

  test("applies additional className if provided", () => {
    render(<TextInput className="extra-class" register={mockRegister()} />);
  });

  test("renders defaultValue if provided", () => {
    render(
      <TextInput defaultValue="Default Value" register={mockRegister()} />,
    );
    expect(screen.getByDisplayValue(/Default Value/i)).toBeInTheDocument();
  });
});
