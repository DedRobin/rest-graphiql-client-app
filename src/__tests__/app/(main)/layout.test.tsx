import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MainLayout from "@/app/(main)/layout";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn().mockReturnValue("/"),
}));

describe("<MainLayout", () => {
  test("<MainLayout /> should be in the document", () => {
    render(<MainLayout>Foo</MainLayout>);
    expect(screen.getByText("Foo")).toBeInTheDocument();
  });
});
