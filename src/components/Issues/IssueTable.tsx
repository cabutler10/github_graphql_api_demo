import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
  Skeleton,
} from "@mui/material";
import { gql, useQuery } from "@apollo/client";

import { useAppDispatch } from "../../app/hooks";
import { setSelectedId } from "./IssuesSlice";

const GET_ISSUES = gql`
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

interface Comments {
  totalCount: number;
}

interface Data {
  title: string;
  id: string;
  comments: Comments;
  number: number;
}

interface IssuesTableProps {
  searchValue: string;
}

export default function IssuesTable(props: IssuesTableProps) {
  const { searchValue } = props;
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState<number>(0);
  // const [after, setAfter] = React.useState<string>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { loading, error, data } = useQuery(GET_ISSUES, {
    variables: {
      value: `repo:facebook/react is:issue is:open${
        searchValue ? " in:title " + searchValue : ""
      }`,
    },
  });

  if (loading)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {[0, 1, 2, 3, 4, 5].map((elem) => (
          <Skeleton
            key={elem}
            variant="rectangular"
            width="100%"
            height={50}
            sx={{ mb: 3 }}
          />
        ))}
      </Box>
    );
  if (error) return <p>{`Error! ${error.message}`}</p>;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // if (data.search.pageInfo.hasNextPage) {
    //   setAfter(data.search.pageInfo.endCursor);
    // }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (number: number) => {
    dispatch(setSelectedId(number));
  };
  const rows = data.search.nodes;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Data) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => handleClick(row.number)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>{row.title}</Typography>
                        <Typography>{`Comments: ${row.comments.totalCount}`}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data.search.issueCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
