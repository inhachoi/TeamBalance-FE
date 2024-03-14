import React, { useState } from 'react';
import { CommentItem } from './CommentItem'; 
import { StCommentsSection } from './Comment.module';
import { StCommentInput } from './Comment.module';
import { StItemSection } from './Comment.module';
import { StCommentInputForm } from './Comment.module';
import { StTogglebutton } from './Comment.module';

export default function CommentList() {
  const initialComments = [
    { userId: 'user1', content: '배고파아아!' },
    { userId: 'user2', content: '짜장면은 쟁반짜장이지' },
    { userId: 'user3', content: '짬뽕도 못먹는 맵찔이' }
  ];

  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState(''); 
  const [showComments, setShowComments] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      const userId = 'currentUserId'; // 유저 아이디를 어떻게 가져올지에 따라 변경 필요
      setComments([...comments, { userId, content: newComment }]);
      setNewComment('');
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
    setButtonVisible(false);
  };

  return (
    <StCommentsSection>
         댓글 {comments.length}개
    

      <StCommentInputForm onSubmit={handleCommentSubmit}>
       
        <StCommentInput
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요"
        />
        <button type="submit">등록</button>
       
      </StCommentInputForm>
      {buttonVisible && (
          <StTogglebutton onClick={handleToggleComments}>댓글 보기</StTogglebutton>
        )}
      {showComments && (
        <StItemSection>
          {comments.map((comment, index) => (
            <CommentItem key={index} userId={comment.userId} content={comment.content} />
          ))}
        </StItemSection>
      )}
    </StCommentsSection>
  );
}
