import { CrossIcon } from "@/components/UI/buttons/CrossIcon";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("CrossIcon Component", () => {
  it("renders the SVG icon", () => {
    render(<CrossIcon />);

    // Проверяем, что SVG элемент присутствует в документе
    const svgElement = screen.getByTestId("cross-icon");
    expect(svgElement).toBeInTheDocument();
  });
});
