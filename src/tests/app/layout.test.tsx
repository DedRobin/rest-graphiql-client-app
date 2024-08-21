import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

vi.mock("next/font/google", () => ({
  Inter: vi.fn(() => ({
    className: "mock-inter-classname",
  })),
}));

describe("<RootLayout", () => {
  test("RootLayout should be defined", () => {
    render(
      <RootLayout>
        <div>Foo</div>
      </RootLayout>,
    );
    expect(screen.getByText(/Foo/i)).toBeInTheDocument();
  });
  test("RootLayout has className='mock-inter-classname'", () => {
    const { container } = render(
      <RootLayout>
        <div>Foo</div>
      </RootLayout>,
    );
    const body = container.querySelector(".mock-inter-classname");
    expect(body).toBeDefined();
  });
});
