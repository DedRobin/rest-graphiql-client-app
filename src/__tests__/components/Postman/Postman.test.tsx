import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Postman } from "@/components/Postman/Postman";
import { createEmptyPostmanUrlStateWithBody } from "@/utils/urlState/createEmptyPostmanUrlStateWithSearchParams";
import { HttpMethod } from "@/types/Method";

describe("<Posman />", () => {
  test("renders Logo component", () => {
    render(
      <Postman urlState={createEmptyPostmanUrlStateWithBody(HttpMethod.GET)} />,
    );
    expect(screen.getByText(/Restfull Client/i)).toBeInTheDocument();
  });

  test("renders Logo component", () => {
    render(
      <Postman
        urlState={createEmptyPostmanUrlStateWithBody(HttpMethod.POST)}
      />,
    );
    expect(screen.getByText(/Restfull Client/i)).toBeInTheDocument();
  });
});
