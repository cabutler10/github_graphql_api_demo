import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";

interface Props {
  text: string;
  authorImage: string;
  createdAt: string;
}

export default function Comment({ text, authorImage, createdAt }: Props) {
  return (
    <Box sx={{ display: "flex", mb: 4 }}>
      <Avatar src={authorImage} />
      <Box sx={{ border: "1px solid #d0d7de", ml: 4 }}>
        <Box sx={{ background: "#F5F8FA", p: 2 }}>
          <Typography>{createdAt}</Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Box>
      </Box>
    </Box>
  );
}
