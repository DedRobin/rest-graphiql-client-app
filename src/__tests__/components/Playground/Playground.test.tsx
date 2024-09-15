import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import GraphiQL from "@/app/(main)/GRAPHQL/client";
import { emptyPlaygroundUrlState } from "@/constants/playgroundEmptyState";

describe("<Posman />", () => {
  test("renders Logo component", () => {
    render(<GraphiQL urlState={emptyPlaygroundUrlState} />);
    expect(screen.getByText(/GraphiQL Editor/i)).toBeInTheDocument();
  });
});
