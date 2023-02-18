import * as React from "react";
import { Typography, Box, Button, Container } from "@mui/material";

import Issues from "../../pages/Issues/Issues";
import Comments from "../../pages/Comments/Comments";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectSelectedId, clearSelectedId } from "../../store/issuesSlice";

export default function Content() {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectSelectedId);

  const handleClick = () => {
    dispatch(clearSelectedId());
  };

  return (
    <Box component="main">
      <Container sx={{ py: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {selectedId && (
            <Button onClick={handleClick} variant="contained" sx={{ mr: 2 }}>
              Go Back to Issues
            </Button>
          )}
          <Typography variant="h2" sx={{ fontSize: 18 }}>
            React Repository
          </Typography>
        </Box>
        {selectedId ? <Comments /> : <Issues />}
      </Container>
    </Box>
  );
}
