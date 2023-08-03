import { render, screen } from "@testing-library/react";
import { Tile } from "../Tile";

describe("Tile", () => {
  it("should render tile", () => {
    render(<Tile tile={{ x: 0, y: 0, value: 4 }} />);

    const tile = screen.getByRole("heading", { level: 1 });
    expect(tile).toHaveTextContent("4");
  });
});
