import * as React from "react";
import { Box, Skeleton } from "@mui/material";

export default function TableSkeleton() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", width: "100%" }}
      data-testid="loading"
    >
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
}
