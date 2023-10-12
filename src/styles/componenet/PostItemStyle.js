import styled from "styled-components";

// 게시글 하나의 전체 백그라운드 스타일 태그
export const PostItemBack = styled.div`
  width: 100%;
  /* max-width: 300px; */
  border: 2px solid mediumorchid;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .scroll::-webkit-scrollbar {
    display: none;
  }
  padding: 10px;
  font-size: 20px;
  border-radius: 10px;
  &:hover {
    border: 2px solid greenyellow;
  }
`;

// 게시글 하나의 박스 스타일 태그
export const PostItemTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* @media screen and (max-width: 768px) {
    font-size: 15px;
  } */
`;

// 게시글 이미지 박스
export const PostItemImgBox = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    /* object-fit: cover; */
  }
  @media screen and (max-width: 768px) {
    height: 230px;
  }
`;
// 게시글 수정 폼 스타일 태그
export const PostItemEditForm = styled.form`
  margin-top: 1rem;
  width: 95%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
`;
// 게시글 수정 폼 내에 input 스타일 태그
export const PostItemEditInput = styled.input`
  border-radius: 5px;
  border: 3px solid mediumorchid;
  width: 70%;
  height: 1.5rem;
  padding: 0.5rem;
`;
// 게시글 수정 폼 내에 게시글 수정 완료 버튼 스타일 태그
export const PostItemEditSubmit = styled.input`
  width: 10rem;
  height: 1.5rem;
  border-radius: 5px;
  border: 3px solid mediumorchid;
  background: white;
`;
// 게시글을 게시한 시간을 보여주는 스타일 태그
export const PostItemTime = styled.span`
  white-space: nowrap;
`;
// 게시글의 카테코리를 보여주는 스타일 태그
export const PostItemCategory = styled.span`
  white-space: nowrap;
`;
// 게시글의 게시자의 이름 스타일 태그
export const PostItemNickname = styled.span`
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  & > span {
    white-space: nowrap;
    width: 100%;
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 768px) {
      width: auto;
      overflow: none;
      text-overflow: none;
    }
  }
`;
// 게시글의 글 스타일 태그
export const PostItemText = styled.div`
  margin-top: 10px;
  width: 100%;
  word-break: break-all;
  height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 120%;
  margin-bottom: 10px;
`;
// 게시글의 좋아요 스타일 태그
export const PostItemLike = styled.div`
  width: 20px;
  color: mediumorchid;
  cursor: pointer;
  font-size: 20px;
`;
