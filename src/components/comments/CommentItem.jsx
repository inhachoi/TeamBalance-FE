import React from "react";
import { StComment } from "./Comment.module";

export const CommentItem = ({ comment }) => {
  return (

    <StComment>
      {comment} <button>x</button> 
    </StComment>
   
  );
};
