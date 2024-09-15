import { LargeButton } from "@/components/UI/buttons/LargeButton/LargeButton";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("LargeButton Component", () => {
  it("should render with children text", () => {
    render(<LargeButton>Click me</LargeButton>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("should render with disabled styles and text when disabled", () => {
    render(
      <LargeButton disabled disabledText="Disabled">
        Click me
      </LargeButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Disabled");
    expect(button).toHaveClass("text-mediumGray opacity-50 cursor-not-allowed");
  });

  it("should render with icon when not disabled", () => {
    render(<LargeButton>Click me</LargeButton>);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("should handle click events", () => {
    const handleClick = vi.fn();

    render(<LargeButton onClick={handleClick}>Click me</LargeButton>);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
