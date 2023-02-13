import React from "react";
import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Content />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
