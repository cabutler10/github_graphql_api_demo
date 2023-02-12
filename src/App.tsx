import React from "react";
import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Box } from "@mui/material";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
