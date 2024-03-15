import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Scrollbars } from 'react-custom-scrollbars';
import { CommentItem } from './CommentItem';
import { StCommentsSection, StCommentInput, StItemSection, StCommentInputForm, StTogglebutton } from './Comment.module';

const fetchComments = async (id) => {
  const response = await fetch(`http://52.78.86.206:8080/api/game/${id}/comment`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

const submitComment = async (id, newComment) => {
  const response = await fetch(`http://52.78.86.206:8080/api/game/${id}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: newComment }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit comment');
  }
  return response.json();
};

export default function CommentList({ id }) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  const { data: comments = [], isLoading, isError } = useQuery(['comments', id], () => fetchComments(id));

  const mutation = useMutation((comment) => submitComment(id, comment), {
    onSuccess: () => {
      setNewComment('');
      // 댓글 추가 후 댓글 다시 불러오기
      fetchComments(id);
    },
  });

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault(); // 이벤트 기본 동작 방지
    mutation.mutate(newComment);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
    setButtonVisible(false);
  };

  return (
    <StCommentsSection>
      🗨댓글 {isLoading ? '로딩 중' : isError ? '댓글을 불러오는 중 오류가 발생했습니다' : comments.length}개

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
        <Scrollbars
          style={{ width: '100%', height: 300 }}
          renderThumbVertical={(props) => <div {...props} style={{ backgroundColor: 'white' }} />}
        >
          <StItemSection>
            {comments.map((comment, index) => (
              <CommentItem key={index} id={comment} body={comment.body} />
            ))}
          </StItemSection>
        </Scrollbars>
      )}
    </StCommentsSection>
  );
}
