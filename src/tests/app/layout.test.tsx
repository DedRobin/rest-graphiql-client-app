import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import MainPage from "@/app/page";

describe.skip("<RootLayout", () => {
  test("RootLeyout should be defined", () => {
    render(<MainPage />);
    expect(
      screen.getByRole("heading", { name: /my application/i }),
    ).toBeInTheDocument();
  });
});
