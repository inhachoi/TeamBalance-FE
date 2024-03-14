import React, { useState } from 'react';
import {StCommentItem} from './CommentItem'; 
import {StCommentsSection} from './Comment.module'
import {StCommentInput} from './Comment.module'
import {StItemSection} from './Comment.module'
import {StCommentInputForm} from './Comment.module'



export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); 

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <StCommentsSection>
<StItemSection>
        {comments.map((comment, index) => (
          <StCommentItem key={index} comment={comment} />
        ))}
   
   </StItemSection>    

      <StCommentInputForm onSubmit={handleCommentSubmit}>
        <StCommentInput
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요"
        />
        <button type="submit">등록</button>
      </StCommentInputForm>

    </StCommentsSection>
  );
}
