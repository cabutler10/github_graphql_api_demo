import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import DOMPurify from "dompurify";

import { IComment } from "../../interfaces/comments.interface";

export default function Comment({
  bodyHTML,
  author,
  createdAt,
}: Partial<IComment>) {
  return (
    <Box sx={{ display: "flex", mb: 4 }}>
      {author && <Avatar src={author.avatarUrl} />}
      <Box sx={{ border: "1px solid #d0d7de", ml: 4 }}>
        <Box sx={{ background: "#F5F8FA", p: 2 }}>
          <Typography>{createdAt}</Typography>
        </Box>
        {bodyHTML && (
          <Box sx={{ p: 2 }}>
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bodyHTML) }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
