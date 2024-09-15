import { Button } from "@/components/UI/buttons/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Мокируем компонент иконки
const MockIcon = ({ className }: { className?: string }) => (
  <svg className={className} data-testid="icon">
    <circle cx="10" cy="10" r="10" />
  </svg>
);

describe("Button Component", () => {
  it("should render with provided className and icon", () => {
    render(
      <Button className="bg-blue" IconComponent={MockIcon}>
        Click me
      </Button>,
    );

    // Проверяем, что кнопка рендерится
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue");

    // Проверяем, что иконка рендерится
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("should apply disabled styles and prevent clicks when disabled", () => {
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-darkGray");

    // Проверяем, что функция не вызывается при клике на отключенную кнопку
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should apply default styles when no IconComponent is provided", () => {
    render(<Button className="bg-red">No Icon</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-red");

    // Проверяем, что иконка не рендерится
    const icon = screen.queryByTestId("icon");
    expect(icon).toBeNull();
  });
});
