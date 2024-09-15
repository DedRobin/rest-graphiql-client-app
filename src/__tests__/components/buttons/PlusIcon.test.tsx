import { PlusIcon } from "@/components/UI/buttons/PlusIcon";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("PlusIcon Component", () => {
  it("renders the SVG icon", () => {
    render(<PlusIcon />);

    // Проверяем, что SVG элемент присутствует в документе
    const svgElement = screen.getByTestId("cross-icon");
    expect(svgElement).toBeInTheDocument();
  });
});
