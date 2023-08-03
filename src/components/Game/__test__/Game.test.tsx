import { render, screen } from "@testing-library/react";
import Game from "../Game";

describe("Game", () => {
  it("should render game grid", () => {
    render(<Game />);

    const tilesWithInitialValue = screen.getAllByText(/2/i);
    expect(tilesWithInitialValue).toHaveLength(2);
    expect(tilesWithInitialValue[0]).toBeInTheDocument();
    expect(tilesWithInitialValue[1]).toBeInTheDocument();
  });
});
