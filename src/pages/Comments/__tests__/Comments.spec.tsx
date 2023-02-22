import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import Comments from "../Comments";
import { GET_COMMENTS } from "../Comments";

const mocks = [
  {
    request: {
      query: GET_COMMENTS,
      variables: {
        number: 1,
      },
    },
    result: {
      data: {
        repository: {
          issue: {
            title: "myIssue",
            comments: {
              edges: [
                {
                  bodyHTML: "<p>my content</p>",
                  id: "123",
                  author: { avatarUrl: "www.mock.com" },
                  createdAt: "1/1/1970",
                },
              ],
            },
          },
        },
      },
    },
  },
];

test("renders without error", () => {
  render(
    <Provider store={store}>
      <MockedProvider>
        <Comments />
      </MockedProvider>
    </Provider>
  );
});

it("renders mocked data", async () => {
  render(
    <Provider store={store}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Comments />
      </MockedProvider>
    </Provider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("my content")).toBeInTheDocument();
});
