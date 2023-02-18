import React from "react";
import { Box } from "@mui/material";
import Content from "./components/Layout/Content";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

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
