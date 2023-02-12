import * as React from "react";
import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ background: "#d3d3d3", py: 1 }}>
      <Typography align="center" sx={{ fontSize: 12 }}>
        © Alyssa Butler
      </Typography>
    </Box>
  );
}
