import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { History } from "@/components/History/History";

vi.mock("@/hooks/useHistoryStorage.ts", () => ({
  useHistoryStorage: vi.fn(() => ({
    historyLines: [
      { id: 1, url: "/GET/aHR0cHM6Ly9kdW1teWpzb24uY29tL3Byb2R1Y3Rz" },
      {
        id: 2,
        url: "/GRAPHQL/aHR0cHM6Ly9yaWNrYW5kbW9ydHlhcGkuY29tL2dyYXBocWw/eyJxdWVyeSI6InF1ZXJ5ICgkZmlsdGVyOiBGaWx0ZXJDaGFyYWN0ZXIpIHtcbiAgY2hhcmFjdGVycyhmaWx0ZXI6ICRmaWx0ZXIpIHtcbiAgICByZXN1bHRzIHtcbiAgICAgIG5hbWVcbiAgICB9XG4gIH1cbn0iLCJ2YXJpYWJsZXMiOiJ7XG4gIFwiZmlsdGVyXCI6IHtcbiAgICBcIm5hbWVcIjogXCJibGFja1wiXG4gIH1cbn0ifQ?Content-Type=application/json",
      },
    ],
  })),
}));

describe("<History />", () => {
  test("renders History component", () => {
    render(<History />);
    expect(
      screen.getByText(/Track all your previous API/i),
    ).toBeInTheDocument();
  });
});
