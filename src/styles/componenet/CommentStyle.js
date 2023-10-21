import styled from "styled-components";
// 댓글 기능의 뒷배경 스타일 태그
export const CommentBack = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  /* box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.1); */
  margin-top: 20px;
  padding: 10px 0;
`;
export const CommentTitle = styled.h3`
  font-size: 30px;
  margin-bottom: 20px;
`;
// 댓글을 입력하는 form 의 스타일 태그
export const CommentForm = styled.form`
  display: flex;
  justify-content: center;
`;
// 댓글을 입력하는 input 의 스타일 태그
export const CommentInput = styled.textarea`
  border: 3px solid black;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  font-size: 20px;
  resize: none;
  padding: 10px;
`;
// 댓글을 입력하고 댓글을 게시하는 버튼의 스타일 태그
export const CommentSubmitButton = styled.button`
  border: 3px solid black;
  margin-left: 1rem;
  border-radius: 10px;
  height: 100px;
  background: white;
  font-size: 20px;
  white-space: nowrap;
  cursor: pointer;
`;

// 아무 댓글이 없다면 보여질 스타일 태그
export const NoComment = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  overflow: auto;
  padding-right: 20px;
`;
