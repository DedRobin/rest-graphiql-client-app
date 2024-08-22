import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import RegisterPage from "@/app/(main)/register/page";

describe("<RegisterPage />", () => {
  test("<RegisterPage /> should be in the document", () => {
    render(<RegisterPage />);
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});
