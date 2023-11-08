import styled from "styled-components";

// 댓글을 구성하는 박스 태그
export const CommentItemBox = styled.div`
  color: black;
  border: 3px solid black;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  @media screen and (min-width: 820px) and (min-height: 1180px) {
    font-size: 2rem;
  }
`;
// 댓글을 삭제하는 삭제 버튼
export const CommentDelete = styled.span`
  float: right;
  cursor: pointer;
  & > span {
    font-size: 30px;
    color: black;
  }
`;
// 댓글 작성자 태그
export const CommentWriter = styled.div``;
// 댓글 내용을 보여주는 태그
export const CommentValue = styled.div`
  margin-top: 10px;
`;
// 댓글 내에 좋아요 태그
export const CommentLike = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-top: 15px;
  cursor: pointer;
  color: black;
  & > span {
    font-size: 20px;
    margin-right: 10px;
    color: ${(props) => (props.isLike ? "red" : "black")};
  }
`;
