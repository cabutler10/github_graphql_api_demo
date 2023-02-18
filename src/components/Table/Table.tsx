import * as React from "react";
import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import { useAppDispatch } from "../../app/hooks";
import { setSelectedId } from "../../store/issuesSlice";
import type { IData } from "../../interfaces/issues.interface";

interface Props {
  rows: IData[];
  numTotalRows: string;
}

export default function Table({ rows, numTotalRows }: Props) {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState<number>(0);
  // const [after, setAfter] = React.useState<string>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Search Results</TableCell>
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
                        <Typography>{`Comments: ${row.comments?.totalCount}`}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={parseInt(numTotalRows, 10)}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
