import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";

test("renders header", () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <App />
      </MockedProvider>
    </Provider>
  );
  const linkElement = screen.getByText(/github repository search demo/i);
  expect(linkElement).toBeInTheDocument();
});
