import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ListInput } from "@/components/UI/Inputs/ListInput/ListInput";

describe("ListInput", () => {
  it("should render ListInput component with label, placeholder, and value", () => {
    render(
      <ListInput
        label="Options"
        placeholder="Choose an option"
        value="Option 1"
        onChange={() => {}}
        options={["Option 1", "Option 2", "Option 3"]}
        name="list-input"
      />,
    );

    const inputElement = screen.getByPlaceholderText(
      "Choose an option",
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe("Option 1");
  });

  it("should render error message when error prop is provided", () => {
    render(
      <ListInput
        label="Options"
        placeholder="Choose an option"
        value=""
        onChange={() => {}}
        options={["Option 1", "Option 2", "Option 3"]}
        error="Please select an option"
        name="list-input"
      />,
    );

    expect(screen.getByText("Please select an option")).toBeInTheDocument();
  });
});
