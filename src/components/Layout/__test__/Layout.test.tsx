import { render, screen } from "@testing-library/react";
import Layout from "../Layout";

describe("Game", () => {
  it("should render layout", () => {
    render(
      <Layout>
        <p>123</p>
      </Layout>
    );

    const childText = screen.getByText(/123/i);
    expect(childText).toBeInTheDocument();

    const tile = screen.getByRole("heading", { level: 1 });
    expect(tile).toHaveTextContent("2048");
  });
});
