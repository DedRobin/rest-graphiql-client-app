import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import MainPage from "@/app/page";

test("MainPage should be defined", () => {
  render(<MainPage />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});
