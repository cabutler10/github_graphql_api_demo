import * as React from "react";
import { Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
// import { gql } from "../../__generated__/gql";

import Table from "../../components/Table/Table";
import TableSkeleton from "../../components/Table/TableSkeleton";
import { ISearch } from "../../interfaces/issues.interface";

export const GET_ISSUES = gql`
  query GetIssues($value: String!) {
    search(query: $value, type: ISSUE, first: 10) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      issueCount
      nodes {
        ... on Issue {
          title
          id
          number
          comments {
            totalCount
          }
        }
      }
    }
  }
`;

interface IssuesQueryResponse {
  search: ISearch;
}

interface Props {
  searchValue: string;
}

export default function IssuesTable({ searchValue }: Props) {
  const { loading, error, data } = useQuery<IssuesQueryResponse>(GET_ISSUES, {
    variables: {
      value: `repo:facebook/react is:issue is:open${
        searchValue ? " in:title " + searchValue : ""
      }`,
    },
  });

  if (loading) return <TableSkeleton />;
  if (error) return <Typography>{`Error! ${error.message}`}</Typography>;

  return (
    <>
      {data ? (
        <Table rows={data.search.nodes} numTotalRows={data.search.issueCount} />
      ) : (
        <Typography>No Results Found!</Typography>
      )}
    </>
  );
}
