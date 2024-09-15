import { ExecuteIcon } from "@/components/UI/buttons/ExecuteIcon";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("ExecuteIcon Component", () => {
  it("renders the SVG icon", () => {
    render(<ExecuteIcon />);

    // Проверяем, что SVG элемент присутствует в документе
    const svgElement = screen.getByTestId("cross-icon");
    expect(svgElement).toBeInTheDocument();
  });
});
