import styled from "styled-components";
// 게시글 올리는 페이지의 배경 스타일 태그
export const PostUploadBack = styled.div`
  /* background-color: #e9e9e9; */
  padding: 60px 20px 40px 20px;
  font-family: "Tilt Neon", sans-serif;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;

// 게시글 올리기 폼 컨테이너
export const PostUploadForm = styled.form`
  width: 100%;
  max-width: 1000px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    margin-top: 25px;
  }
`;
// ============================================ 매장 이름 =======================================
export const InputPostNameBox = styled.div`
  width: 100%;
  height: 120px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;
export const InputTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 15px;
`;
export const NameInput = styled.input`
  border: 2px solid #b4b4b4;
  border-radius: 10px;
  height: 50px;
  padding: 10px;
  &:focus {
    border: 2px solid #6edcdc;
  }
`;
export const PostUploadPostNameTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
// ============================================ 이미지 업로드 ======================================
// 이미지 업로드 부분 박스
export const InputPostImageBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 160px;
  padding: 10px 0;
`;
// 이미지 업로드 버튼 인풋 태그
export const UploadImageInput = styled.input`
  display: none;
`;

// 업로드 이미지
export const UploadImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
`;
// 선택한 이미지를 보여주는 박스
export const UploadImgBox = styled.div`
  height: 120px;
  /* overflow-y: scroll; */
  display: flex;
`;
// 업로드 한 이미지 삭제 버튼
export const UploadImgDeleteBtn = styled.button`
  font-size: 25px;
  border: none;
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
  background-color: black;
`;
// 업로드 한 이미지의 박스
export const UploadImgItem = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100px;
  height: 100px;
  position: relative;
`;
// 업로드 이미지가 없을때
export const UploadEmptyImg = styled.label`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100px;
  height: 100px;
  & > span {
    cursor: pointer;
    font-size: 90px;
    color: black;
    &:hover {
      color: #a0a0a0;
    }
  }
`;

// ============================================ 이미지 업로드 끝 ======================================

// ============================================ 자세한 설명 =====================================
// 텍스트 입력 박스
export const InputPostDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 160px;
  padding: 10px 0;
`;
// 텍스트 입력 제목 박스
export const PostUploadInputTextBoxTitleBox = styled.div`
  display: flex;
  align-items: center;
`;

// 텍스트 입력 textarea
export const PostDesctiptionInput = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  background: transparent;
  border-style: none;
  border: 2px solid #b4b4b4;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  &:focus {
    border: 2px solid #6edcdc;
  }
`;

// ==================================== 자세한 설명 부분 끝 ==============================

// ===================================== 카테고리 선택 =======================================
// 카테고리 선택 박스
export const InputPostCategoryBox = styled.div`
  height: 110px;
  padding-bottom: 20px;
  padding: 10px 0;
`;

// 카테고리 선택 input
export const CategoryInput = styled.input`
  display: none;
`;
// 카테고리 선택 메뉴 박스
export const CategoryMenuBox = styled.div`
  margin-top: 10px;
  display: flex;
`;
// 카테고리 선택 버튼
export const CategoryBtn = styled.label`
  border: none;
  width: 120px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
  background-color: ${(props) =>
    props.userSelectCategory !== "" ? props.userSelectCategory : "#dcdcdc"};
  color: ${(props) => (props.userSelectCategory !== "" ? "white" : "black")};
  & > span {
    margin-left: 5px;
  }
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    margin-right: 10px;
  }
`;

// ======================================  카테고리 선택 끝 =======================================

// 게시글에 올릴 정보를 모두 작성하고 클릭하는 완료 버튼

export const SubmitBtn = styled.input`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: none;
  background-color: black;
  font-size: 20px;
  cursor: pointer;
  color: white;
  &:hover {
    opacity: 0.7;
  }
`;

export const MapInput = styled.input`
  display: none;
`;
export const PostUploadMapBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const MapBoxTitle = styled.h1`
  font-size: 20px;
`;

export const PostUploadSubmitBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50px;
`;

// 맵 레이아웃 스타일 태그
export const MapBox = styled.div`
  font-size: 20px;
  border: 2px solid #b4b4b4;
  margin-top: 10px;
  border-radius: 10px;
`;

export const MapInnerBox = styled.div`
  cursor: pointer;
  font-size: 20px;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  & > span {
    color: white;
    font-size: 35px;
    color: #b4b4b4;
    &:hover {
      color: #828282;
    }
  }
`;

export const ErrorMsg = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #50b4ff;
`;
