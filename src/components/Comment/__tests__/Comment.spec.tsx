import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MockedProvider } from "@apollo/client/testing";
import { store } from "../../../app/store";
import Comment from "../Comment";

const mockData = {
  bodyHTML: "<p>my content</p>",
  author: { avatarUrl: "someLink" },
  createdAt: "1/1/1970",
};
test("renders component", () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <Comment {...mockData} />
      </MockedProvider>
    </Provider>
  );
  const textElement = screen.getByText(/my content/i);
  expect(textElement).toBeInTheDocument();
});
