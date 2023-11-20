import styled from "styled-components";

// 게시글 하나의 전체 백그라운드 스타일 태그
export const TopPostItemBack = styled.div`
  color: black;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0;
  width: 285px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  /* .scroll::-webkit-scrollbar {
    display: none;
  } */
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
`;

// 게시글 하나의 박스 스타일 태그
export const TopPostItemTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

// 게시글 이미지 박스
export const TopPostItemImgBox = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

// 게시글을 게시한 시간을 보여주는 스타일 태그
export const TopPostItemTime = styled.span`
  white-space: nowrap;
`;
// 게시글의 카테코리를 보여주는 스타일 태그
export const TopPostItemCategory = styled.span`
  white-space: nowrap;
`;
// 게시글의 게시자의 이름 스타일 태그
export const TopPostItemNickname = styled.span`
  color: white;
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  & > span {
    color: white;
    white-space: nowrap;
    width: 100%;
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
// 게시글의 글 스타일 태그
export const TopPostItemPostName = styled.div`
  color: black;
  margin-top: 10px;
  width: 100%;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 120%;
  margin-bottom: 10px;
`;
// 게시글의 좋아요 스타일 태그
export const TopPostItemLike = styled.div`
  width: 20px;
  color: black;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  & > span {
    margin-right: 5px;
  }
`;
