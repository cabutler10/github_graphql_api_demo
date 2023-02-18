import * as React from "react";
import { Box, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

import Comment from "./Comment";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedId } from "../../store/issuesSlice";

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
  query GetComments($number: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        id
        title
        comments(first: 50) {
          edges {
            node {
              bodyHTML
              id
              author {
                avatarUrl
              }
              createdAt
            }
          }
        }
      }
    }
  }
`;

export default function Comments() {
  const selectedId = useAppSelector(selectSelectedId);
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: {
      number: selectedId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error! ${error.message}`}</p>;

  return (
    <Box>
      <Typography>{data.repository.issue.title}</Typography>
      <Typography>{data.repository.issue.id}</Typography>
      {data.repository.issue.comments.edges.map((elem: CommentQueryProps) => (
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
