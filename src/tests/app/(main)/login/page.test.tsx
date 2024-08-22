import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/(main)/login/page";

describe("<LoginPage />", () => {
  test("<LoginPage /> should be in the document", () => {
    render(<LoginPage />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
