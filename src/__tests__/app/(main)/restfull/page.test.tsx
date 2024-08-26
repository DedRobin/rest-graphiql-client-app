import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import RESTfullPage from "@/app/(main)/restfull/page";

describe("<RESTfullPage />", () => {
  test("<RESTfullPage /> should be in the document", () => {
    render(<RESTfullPage />);
    expect(screen.getByText(/RESTfull Editor/i)).toBeInTheDocument();
  });
});
