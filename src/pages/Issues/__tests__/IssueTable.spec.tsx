import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import IssueTable from "../IssuesTable";
import { GET_ISSUES } from "../IssuesTable";

const mocks = [
  {
    request: {
      query: GET_ISSUES,
      variables: {
        value: "repo:facebook/react is:issue is:open in:title test",
      },
    },
    result: {
      data: {
        search: {
          nodes: [
            {
              title: "myIssue",
              id: "123",
              number: 123,
              comments: { totalCount: 1, __typename: "Comments" },
              __typename: "Issue",
            },
          ],
          issueCount: 10,
          pageInfo: {
            hasPreviousPage: false,
            hasNextPage: false,
            startCursor: "123",
            endCursor: "456",
            __typename: "PageInfo",
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
        <IssueTable searchValue="" />
      </MockedProvider>
    </Provider>
  );
});

it("renders mocked data", async () => {
  render(
    <Provider store={store}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <IssueTable searchValue="test" />
      </MockedProvider>
    </Provider>
  );
  expect(screen.getByTestId("loading")).toBeInTheDocument();
  expect(await screen.findByText("myIssue")).toBeInTheDocument();
});
