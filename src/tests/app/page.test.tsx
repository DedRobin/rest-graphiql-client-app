import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("<MainPage />", () => {
  test("<MainPage /> should be in the document", () => {
    render(<HomePage />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
