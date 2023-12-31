import styled from "styled-components";

// 게시글 하나의 전체 백그라운드 스타일 태그
export const PostItemBack = styled.div`
  width: 100%;
  height: 100%;
  max-height: 250px;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .scroll::-webkit-scrollbar {
    display: none;
  }
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
`;

// 게시글 하나의 박스 스타일 태그
export const PostItemTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`;

// 게시글 이미지 박스
export const PostItemImgBox = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 150px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: fill;
  }
`;
// 게시글을 게시한 시간을 보여주는 스타일 태그
export const PostItemTime = styled.span`
  white-space: nowrap;
`;
// 게시글의 카테코리를 보여주는 스타일 태그
export const PostItemCategory = styled.span`
  white-space: nowrap;
`;
// 게시글의 글 스타일 태그
export const TopPostItemPostName = styled.div`
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
export const PostItemLike = styled.div`
  width: 20px;
  color: black;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  & > span {
    margin-right: 3px;
    font-size: 18px;
  }
`;

export const ProfileImg = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-left: 5px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;
