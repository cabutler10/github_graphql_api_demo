import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import { store } from "../../../app/store";
import Issues from "../Issues";

test("renders component", () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <Issues />
      </MockedProvider>
    </Provider>
  );
  const textElement = screen.getByText(/Search/i);
  expect(textElement).toBeInTheDocument();
});
