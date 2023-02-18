import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import { store } from "../../../app/store";
import Content from "../Content";

test("renders component", () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <Content />
      </MockedProvider>
    </Provider>
  );
  const textElement = screen.getByText(/React Repository/i);
  expect(textElement).toBeInTheDocument();
});
