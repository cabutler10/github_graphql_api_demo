import * as React from "react";
import { Box, Typography } from "@mui/material";
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
          <Typography>{data.repository.issue.title}</Typography>
          <Typography>{data.repository.issue.id}</Typography>
          {data.repository.issue.comments.edges.map((elem) => (
            <Comment
              text={elem.node.bodyHTML}
              key={elem.node.id}
              authorImage={elem.node.author.avatarUrl}
              createdAt={elem.node.createdAt}
            />
          ))}
        </>
      ) : (
        <Typography>No Results Found</Typography>
      )}
    </Box>
  );
}
