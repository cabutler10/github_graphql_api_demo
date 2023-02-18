import * as React from "react";
import { Box, Button, TextField } from "@mui/material";

import IssueTable from "./IssuesTable";

export default function Issues() {
  const [value, setValue] = React.useState<string>("");
  const [searchValue, setSearchValue] = React.useState<string>("");

  const handleClick = () => {
    setSearchValue(value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ flexGrow: 1 }}
          id="outlined-controlled"
          label="Search Issues"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
        />
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleClick}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IssueTable searchValue={searchValue} />
      </Box>
    </>
  );
}
