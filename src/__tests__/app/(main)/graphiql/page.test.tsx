import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import GraphiQLPage from "@/app/(main)/GRAPHQL/[...slug]/page";

describe("<GraphiQLPage />", () => {
  test("<GraphiQLPage /> должен корректно рендериться", () => {
    // Пример пропсов
    const props = {
      params: {
        slug: [
          "endpoint",
          "eyJxdWVyeSI6IkhlbGxvIiwiYXJndW1lbnRzIjp7fX0=", // Пример base64 строки
        ],
      },
      searchParams: { Authorization: "Bearer token" },
    };

    render(<GraphiQLPage {...props} />);

    expect(screen.getByText(/GraphiQL Editor/i)).toBeInTheDocument();
  });
});
