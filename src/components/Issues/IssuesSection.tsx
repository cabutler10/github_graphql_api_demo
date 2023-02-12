import * as React from "react";
import { Box, Skeleton, Autocomplete, TextField } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

import IssueTable from "./IssueTable";

const GET_ISSUES = gql`
  query GetIssues {
    repository(owner: "facebook", name: "react") {
      issues(last: 20, states: CLOSED) {
        edges {
          node {
            title
            url
            id
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export default function IssuesPage() {
  const { loading, error, data } = useQuery(GET_ISSUES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        sx={{ width: "100%", mb: 2 }}
        renderInput={(params) => (
          <TextField {...params} label="Search issues..." />
        )}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {data && !loading ? (
          <IssueTable rows={data.repository.issues.edges} />
        ) : (
          <>
            {[0, 1, 2, 3, 4, 5].map((elem) => (
              <Skeleton
                key={elem}
                variant="rectangular"
                width="100%"
                height={100}
                sx={{ mb: 3 }}
              />
            ))}
          </>
        )}
      </Box>
    </>
  );
}
