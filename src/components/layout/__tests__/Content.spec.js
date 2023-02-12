import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import Content from "../Content";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders component", () => {
  render(<Content />);
  const textElement = screen.getByText(/Keyword Search Trends/i);
  expect(textElement).toBeInTheDocument();
});

it("renders user data", async () => {
  const fakeData = {
    country: "Germany",
    date: "2021-01-21",
    keywords: [],
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );

  await act(async () => {
    render(<Content />);
  });
  const textElement = screen.getByText(/winners/i);
  expect(textElement).toBeInTheDocument();

  global.fetch.mockRestore();
});
