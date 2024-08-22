import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import MainPage from "@/app/page";

describe("<MainPage />", () => {
  test("<MainPage /> should be in the document", () => {
    render(<MainPage />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
