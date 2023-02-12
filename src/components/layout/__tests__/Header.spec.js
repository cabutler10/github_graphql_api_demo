import { render, screen } from "@testing-library/react";
import Header from "../Header";

test("renders text", () => {
  render(<Header />);
  const textElement = screen.getByText(/semrush/i);
  expect(textElement).toBeInTheDocument();
});
