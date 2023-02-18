import { render, screen } from "@testing-library/react";
import Header from "../Header";

test("renders text", () => {
  render(<Header />);
  const textElement = screen.getByText(/Github Repository Search Demo/i);
  expect(textElement).toBeInTheDocument();
});
