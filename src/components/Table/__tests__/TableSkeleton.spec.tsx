import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import { store } from "../../../app/store";
import TableSkeleton from "../TableSkeleton";

test("renders component", () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <TableSkeleton />
      </MockedProvider>
    </Provider>
  );
  const textElement = screen.getByTestId(/loading/i);
  expect(textElement).toBeInTheDocument();
});
