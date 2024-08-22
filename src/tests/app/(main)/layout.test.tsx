import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import MainLayout from "@/app/(main)/layout";

describe("<MainLayout", () => {
  test("<MainLayout /> should be in the document", () => {
    render(<MainLayout>Foo</MainLayout>);
    expect(screen.getByText(/Foo/i)).toBeInTheDocument();
  });
});
