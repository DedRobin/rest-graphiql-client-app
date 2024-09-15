import { BurgerButton } from "@/components/UI/buttons/BurgerButton/BurgerButton";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("BurgerButton Component", () => {
  it("renders the button", () => {
    const mockToggleBurgerMenu = vi.fn();

    render(
      <BurgerButton
        isBurgerMenuOpen={false}
        toggleBurgerMenu={mockToggleBurgerMenu}
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
