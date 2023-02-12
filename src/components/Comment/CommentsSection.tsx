import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

import Comment from "./Comment";
import { useAppDispatch } from "../../app/hooks";
import { clearSelectedId } from "../Issues/IssuesSlice";
// import { useAppSelector } from "../../app/hooks";
// import { selectSelectedId } from "../Issues/IssuesSlice";

interface AuthorProps {
  avatarUrl: string;
}

interface CommentQueryNodeProps {
  id: string;
  bodyHTML: string;
  createdAt: string;
  author: AuthorProps;
}

interface CommentQueryProps {
  node: CommentQueryNodeProps;
}

const GET_COMMENTS = gql`
  query GetComments {
    repository(owner: "facebook", name: "react") {
      issues(first: 1) {
        edges {
          node {
            title
            id
            comments(last: 5) {
              edges {
                node {
                  id
                  bodyHTML
                  createdAt
                  author {
                    avatarUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function CommentsSection() {
  const dispatch = useAppDispatch();
  // const selectedId = useAppSelector(selectSelectedId);
  const { loading, error, data } = useQuery(GET_COMMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error! ${error.message}`}</p>;

  const handleClick = () => {
    dispatch(clearSelectedId());
  };

  const comments = data.repository.issues.edges[0].node.comments.edges;
  return (
    <Box>
      <Button onClick={handleClick} variant="contained" sx={{ mb: 2 }}>
        Go Back to Issues
      </Button>
      <Typography>{data.repository.issues.edges[0].title}</Typography>
      <Typography>{data.repository.issues.edges[0].id}</Typography>
      {comments.map((elem: CommentQueryProps) => (
        <Comment
          text={elem.node.bodyHTML}
          key={elem.node.id}
          authorImage={elem.node.author.avatarUrl}
          createdAt={elem.node.createdAt}
        />
      ))}
    </Box>
  );
}
