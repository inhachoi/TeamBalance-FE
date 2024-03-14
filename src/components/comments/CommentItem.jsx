import React from "react";
import { StComment } from "./Comment.module";

export const CommentItem = ({ userId, content }) => {
  const handleDelete = () => {
    console.log('댓글 삭제:', content);
  };

  return (
    <StComment>
      <span>{userId}: </span>
      <span>{content}</span>
      <button onClick={handleDelete}>x</button>
    </StComment>
  );
};
