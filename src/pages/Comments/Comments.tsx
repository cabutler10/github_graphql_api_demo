import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

import Comment from "../../components/Comment/Comment";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedId } from "../../store/issuesSlice";
import { IComment } from "../../interfaces/comments.interface";

interface ICommentNode {
  node: IComment;
}

interface IComments {
  edges: ICommentNode[];
}

interface IIssue {
  id: string;
  title: string;
  comments: IComments;
}

interface IRepository {
  issue: IIssue;
}

interface CommentQueryProps {
  repository: IRepository;
}

export const GET_COMMENTS = gql`
  query GetComments($number: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
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
  const { loading, error, data } = useQuery<CommentQueryProps>(GET_COMMENTS, {
    variables: {
      number: selectedId,
    },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{`Error! ${error.message}`}</Typography>;

  return (
    <Box>
      {data ? (
        <>
          <Typography sx={{ fontSize: 24, fontWeight: "bold", mb: 2 }}>
            {data.repository.issue.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {data.repository.issue.comments.edges.map((elem) => (
            <Comment {...elem.node} key={elem.node.id} />
          ))}
        </>
      ) : (
        <Typography>No Results Found</Typography>
      )}
    </Box>
  );
}
