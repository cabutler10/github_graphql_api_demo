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
        <Box>
          <Typography variant="h2" sx={{ fontSize: 18, mb: 2 }}>
            React Repository
          </Typography>
          {selectedId && (
            <Button
              onClick={handleClick}
              variant="outlined"
              sx={{ mb: 2 }}
              size="small"
            >
              Go Back to Issues
            </Button>
          )}
        </Box>
        {selectedId ? <Comments /> : <Issues />}
      </Container>
    </Box>
  );
}
