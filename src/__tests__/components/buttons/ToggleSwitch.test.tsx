import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TLanguage } from "@/services/locale/contex";
import { ToggleSwitch } from "@/components/UI/buttons/ToggleSwitch/ToggleSwitch";

// Мок данных для props
const defaultProps = {
  language: "en" as TLanguage, // Приведение типа для тестов
  onToggle: () => {}, // Функция-заглушка для проверки
};

describe("ToggleSwitch Component", () => {
  it("renders the toggle button", () => {
    render(<ToggleSwitch {...defaultProps} />);

    // Проверяем, что кнопка рендерится в документе
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
