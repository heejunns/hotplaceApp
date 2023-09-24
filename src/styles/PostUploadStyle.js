import styled from "styled-components";
// 게시글 올리는 페이지의 배경 스타일 태그
export const PostUploadBack = styled.div`
  font-family: "Nanum Myeongjo", serif;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

// 게시글 올리기 폼 스타일 태그
export const PostUploadForm = styled.form`
  min-width: 370px;
  overflow-y: auto;
  margin-top: 0.5rem;
  padding: 1rem;
  width: 90%;
  height: 90%;
  min-height: 90%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  /* border: 3px solid mediumorchid; */
  @media screen and (min-width: 400px) {
    width: 80%;
  }
  @media screen and (min-width: 768px) {
    width: 60%;
  }
`;
// 텍스트 input
export const InputPostText = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  background: transparent;
  border-style: none;
  border: 1px solid blue;
`;
// 카테고리 선택 input
export const InputCategory = styled.input``;
// 이미지 업로드 버튼 input
export const ImgFileSelectInput = styled.input`
  display: none;
`;
// 이미지 업로드 버튼 label
export const ImgFileSelectLabel = styled.label`
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: mediumorchid;
  }
`;
// 게시글에 올릴 정보를 모두 작성하고 클릭하는 완료 버튼
export const SubmitBtn = styled.input`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 3px solid mediumorchid;
  background-color: transparent;
`;
// 작성하는 글의 매장 위치를 기록하기 위한 카카오 맵을 불러오는 위치 지정하기 버튼 스타일 태그
export const MapBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 3px solid mediumorchid;
  background-color: transparent;
`;
// 업로드 이미지 박스
export const UploadImgBox = styled.div`
  margin: 0.3rem 0 0 1rem;
  padding: 5px;
  width: 100px;
  height: 100px;
  position: relative;
`;
// 업로드 이미지
export const UploadImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
// 업로드하기 위해 선택한 이미지 삭제 버튼
export const UploadImgDeleteBtn = styled.button`
  font-size: 25px;
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: white;
  background-color: mediumorchid;
  border: 2px solid mediumorchid;
`;

export const PostUploadImageBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
`;
export const PostUploadCategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
`;

export const CategoryTitle = styled.span`
  font-size: 20px;
`;

export const CategoryMenu = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const PostUploadInputTextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
`;
export const InputTextBoxTitle = styled.span`
  font-size: 20px;
  margin-right: 20px;
`;

export const PostUploadMapBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
`;

export const MapBoxTitle = styled.span`
  font-size: 20px;
`;

export const PostUploadSubmitBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50px;
`;

export const PostUploadInputTextBoxTitleBox = styled.div`
  display: flex;
  align-items: center;
`;

export const InputTextNumberLimit = styled.span``;
