import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import { store } from "../../../app/store";
import Table from "../Table";

test("renders component", () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <Table rows={[]} numTotalRows="1" />
      </MockedProvider>
    </Provider>
  );
  const textElement = screen.getByText(/Search Results/i);
  expect(textElement).toBeInTheDocument();
});

test("renders the correct number of rows", () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <Table rows={[]} numTotalRows="5" />
      </MockedProvider>
    </Provider>
  );
  const textElement = screen.getByText(/React Repository/i);
  expect(textElement).toBeInTheDocument();
});
