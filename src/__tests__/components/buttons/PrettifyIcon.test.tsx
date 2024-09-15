import { PrettifyIcon } from "@/components/UI/buttons/PrettifyIcon";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("PrettifyIcon Component", () => {
  it("renders the SVG icon", () => {
    render(<PrettifyIcon />);

    // Проверяем, что SVG элемент присутствует в документе
    const svgElement = screen.getByTestId("cross-icon");
    expect(svgElement).toBeInTheDocument();
  });
});
