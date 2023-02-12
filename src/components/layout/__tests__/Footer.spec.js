import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

test("renders text", () => {
  render(<Footer />);
  const textElement = screen.getByText(/Alyssa Butler/i);
  expect(textElement).toBeInTheDocument();
});
