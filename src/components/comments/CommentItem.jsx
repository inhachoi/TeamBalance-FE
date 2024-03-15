import React from "react";
import { StComment } from "./Comment.module";

export const CommentItem = ({ id, body }) => {
  const handleDelete = () => {
    console.log('댓글 삭제:', body);
  };

  return (
<>
    <StComment>
      <div>👤{id} </div>
      <span>{body}</span>
    </StComment>
          <button onClick={handleDelete}>수정</button>
          <button onClick={handleDelete}>삭제</button>
          </>
  );
};
