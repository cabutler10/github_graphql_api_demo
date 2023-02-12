import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";

import { useAppDispatch } from "../../app/hooks";
import { setSelectedId } from "./IssuesSlice";

interface Comments {
  totalCount: number;
}

interface Data {
  title: string;
  id: string;
  comments: Comments;
  labels: number;
}

interface Node {
  node: Data;
}

interface IssuesTableProps {
  rows: Node[];
}

export default function IssuesTable(props: IssuesTableProps) {
  const { rows } = props;
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (id: string) => {
    dispatch(setSelectedId(id));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.node.id}
                    onClick={() => handleClick(row.node.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{row.node.title}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
