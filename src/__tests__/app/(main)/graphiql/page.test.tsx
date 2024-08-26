import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import GraphiQLPage from "@/app/(main)/graphiql/page";

describe("<GraphiQLPage />", () => {
  test("<GraphiQLPage /> should be in the document", () => {
    render(<GraphiQLPage />);
    expect(screen.getByText(/GraphiQL Editor/i)).toBeInTheDocument();
  });
});
