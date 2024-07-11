import styled from "styled-components";

// 게시글 컨테이너
export const PostItemContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 250px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 10px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .scroll::-webkit-scrollbar {
    display: none;
  }
  font-size: 18px;
  border-radius: 10px;
  background-color: white;
`;

// 게시글의 좋아요, 시간 들의 정보가 담긴 박스
export const PostItemInfoBox = styled.div`
  padding: 0 10px;
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`;

// 게시글 이미지
export const PostItemImg = styled.div`
  width: 100%;
  height: 150px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: fill;
  }
`;
// 게시글을 게시한 시간
export const PostItemTime = styled.span`
  color: white;
  white-space: nowrap;
`;

// 게시글 좋아요
export const PostItemLike = styled.div`
  color: white;
  width: 20px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  & > span {
    margin-right: 3px;
    font-size: 18px;
  }
`;
