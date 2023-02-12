import * as React from "react";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { setSelectedId } from "./IssuesSlice";

interface IIssue {
  title: string;
  id: string;
}

interface IIssueList {
  data: IIssue[];
}

export default function IssueList({ data }: IIssueList) {
  const dispatch = useAppDispatch();
  const handleClick = (id: string) => {
    dispatch(setSelectedId(id));
  };

  return (
    <List>
      {data.map((elem) => (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleClick("id")}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={elem.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
