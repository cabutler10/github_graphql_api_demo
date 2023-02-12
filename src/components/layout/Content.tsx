import * as React from "react";
import { Typography, Box, Container } from "@mui/material";

import { useAppSelector } from "../../app/hooks";
import IssuesSection from "../Issues/IssuesSection";
import CommentsSection from "../Comment/CommentsSection";
import { selectSelectedId } from "../Issues/IssuesSlice";

export default function Content() {
  const selectedId = useAppSelector(selectSelectedId);
  console.log(selectedId);
  return (
    <Box component="main">
      <Container sx={{ py: 6 }}>
        <Typography variant="h2" sx={{ fontSize: 18, mb: 4 }}>
          React Repository
        </Typography>
        {selectedId ? <CommentsSection /> : <IssuesSection />}
      </Container>
    </Box>
  );
}
