import { Logo } from "@/components/UI/logo/Logo";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("<Logo />", () => {
  test("renders Logo component", () => {
    render(<Logo />);
    // Check if the Logo component renders
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  test("renders Image with correct attributes", () => {
    render(<Logo />);
    const image = screen.getByAltText("Logo") as HTMLImageElement;

    // Verify the src, alt, width, and height attributes
    expect(image).toHaveAttribute("src", "/logo.svg");
    expect(image).toHaveAttribute("alt", "Logo");
    expect(image).toHaveAttribute("width", "93");
    expect(image).toHaveAttribute("height", "21");
  });

  test("div has the correct styling", () => {
    render(<Logo />);
    const div = screen.getByRole("img").parentElement; // The parent <div> of the Image component

    // Check the div's class
    expect(div).toHaveClass("w-[93px] h-[21px]");
  });
});
