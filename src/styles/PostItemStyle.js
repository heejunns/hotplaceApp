import styled from "styled-components";

// 게시글 하나의 전체 백그라운드 스타일 태그
export const PostItemBack = styled.div`
  width: 90%;
  border-top: ${(props) =>
    props.index === 0 ? `none` : `1px solid mediumorchid`};
  border-left: 1px solid mediumorchid;
  border-right: 1px solid mediumorchid;

  border-bottom: ${(props) =>
    props.index === props.dataLen - 1 && `1px solid mediumorchid`};
  display: flex;
  flex-direction: column;
  .scroll::-webkit-scrollbar {
    display: none;
  }
  padding: 0.5rem;
  font-size: 1rem;
  @media screen and (min-width: 768px) and (min-height: 1024px) {
    font-size: 1.3rem;
  }
  @media screen and (min-width: 400px) {
    font-size: 1.2rem;
  }
  @media screen and (min-width: 768px) {
    font-size: 1.3rem;
  }
`;

// 게시글 하나의 박스 스타일 태그
export const PostItemBox = styled.div`
  width: 100%;
  height: auto;
`;

// 게시글 버튼들의 박스 스타일 태그
export const PostBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// 게시글 버튼들의 스타일 태그
export const PostItemBtn = styled.button`
  margin: 0 0.3rem;
  border-style: none;
  padding: 0.3rem;
  background: white;
  font-size: 0.5rem;
  color: mediumorchid;
  @media screen and (min-width: 768px) and (min-height: 1024px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 400px) {
    font-size: 0.7rem;
  }
  @media screen and (min-width: 970px) {
    font-size: 1.2rem;
  }
`;

// 업로드 하려는 이미지의 스타일 태그
export const PostItemImg = styled.img`
  width: 100%;
  height: 15rem;
  border-radius: 10px;
  @media screen and (min-width: 820px) {
    width: 100%;
    height: 20rem;
  }
  @media screen and (min-width: 1400px) {
    width: 100%;
    height: 25rem;
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
  @media screen and (min-width: 768px) and (min-height: 1024px) {
    height: 2.5rem;
    font-size: 1.3rem;
  }
  @media screen and (min-width: 400px) {
    height: 2rem;
    font-size: 1rem;
  }
  @media screen and (min-width: 768px) {
    height: 2.5rem;
    font-size: 1.3rem;
  }
`;
// 게시글 수정 폼 내에 게시글 수정 완료 버튼 스타일 태그
export const PostItemEditSubmit = styled.input`
  width: 10rem;
  height: 1.5rem;
  border-radius: 5px;
  border: 3px solid mediumorchid;
  background: white;
  @media screen and (min-width: 768px) and (min-height: 1024px) {
    height: 2.5rem;
    font-size: 1.3rem;
  }
  @media screen and (min-width: 400px) {
    height: 2rem;
    font-size: 1rem;
  }
  @media screen and (min-width: 768px) {
    height: 2.5rem;
    font-size: 1.3rem;
  }
`;
// 게시글을 게시한 시간을 보여주는 스타일 태그
export const PostItemTime = styled.div`
  float: right;
`;
// 게시글의 카테코리를 보여주는 스타일 태그
export const PostItemCategory = styled.div`
  float: right;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
// 게시글의 게시자의 이름 스타일 태그
export const PostItemNickname = styled.h3`
  float: left;
`;
// 게시글의 글 스타일 태그
export const PostItemText = styled.h3`
  clear: both;
  width: 100%;
  height: auto;
  word-break: break-all;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
`;
// 게시글의 좋아요 스타일 태그
export const PostItemLike = styled.div`
  width: 3rem;
  color: mediumorchid;

  cursor: pointer;
  margin-top: 1rem;
  font-size: 1.2rem;
  &:hover {
    color: red;
  }
  @media screen and (min-width: 768px) and (min-height: 1024px) {
    font-size: 1.5rem;
  }
  @media screen and (min-width: 400px) {
    font-size: 1.2rem;
  }
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;
