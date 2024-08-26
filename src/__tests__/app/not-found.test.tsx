import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("<NotFound />", () => {
  test("<NotFound /> should be in the document", () => {
    render(<NotFound />);
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
