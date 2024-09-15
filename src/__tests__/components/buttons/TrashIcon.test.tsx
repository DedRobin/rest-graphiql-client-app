import { TrashIcon } from "@/components/UI/buttons/TrashIcon";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("TrashIcon Component", () => {
  it("renders the SVG icon", () => {
    render(<TrashIcon />);

    // Проверяем, что SVG элемент присутствует в документе
    const svgElement = screen.getByTestId("cross-icon");
    expect(svgElement).toBeInTheDocument();
  });
});
