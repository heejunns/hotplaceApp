import styled from "styled-components";
// 게시글 올리는 페이지의 배경 스타일 태그
export const PostUploadBack = styled.div`
  font-family: "Tilt Neon", sans-serif;
  width: 100%;
  background-color: white;
  padding: 30px 10px;
  display: flex;
  justify-content: center;
  z-index: 100;
`;

// 게시글 올리기 폼 컨테이너
export const PostUploadFormContainer = styled.form`
  width: 100%;
  max-width: 1000px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;
// ============================================ 매장 이름 =======================================
export const PostUploadPostNameBox = styled.div`
  width: 100%;
  height: 140px;
  border-bottom: 1px solid grey;
  padding: 20px 0 30px 0;
  display: flex;
  flex-direction: column;
`;
export const PostUploadPostNameTitle = styled.h1`
  font-size: 20px;

  margin-right: 20px;
`;
export const PostUploadPostNameInput = styled.input`
  border: 1px solid #a0a0a0;
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
export const PostUploadImageBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;
  padding: 30px 0;
  border-bottom: 1px solid grey;
`;
// 이미지 업로드 버튼 인풋 태그
export const ImgFileSelectInput = styled.input`
  display: none;
`;
// 이미지 업로드 제목
export const ImgFileSelectTitle = styled.h1`
  font-size: 20px;
`;
// 업로드 이미지
export const UploadImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
`;
// 업로드 한 이미지 삭제 버튼
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
  border-radius: 100%;
  color: white;
  background-color: black;
  border: 2px solid black;
`;
// 업로드 한 이미지의 박스
export const UploadImgBox = styled.div`
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
export const PostUploadInputTextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  border-bottom: 1px solid grey;
  padding: 30px 0;
`;
// 텍스트 입력 제목 박스
export const PostUploadInputTextBoxTitleBox = styled.div`
  display: flex;
  align-items: center;
`;

// 텍스트 입력 textarea
export const InputPostText = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  background: transparent;
  border-style: none;
  border: 1px solid #a0a0a0;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  &:focus {
    border: 2px solid #6edcdc;
  }
`;
//
export const InputTextBoxTitle = styled.h1`
  font-size: 20px;
  margin-right: 20px;
`;
// 현재 입력한 글자 수
export const InputTextCurrentNumber = styled.span`
  color: #a0a0a0;
`;
// 현재 입력한 글자의 수가 제한된 글자 수를 모두 채웠다는 멘트
export const InputTextLimitText = styled.span`
  margin-left: 10px;
  color: red;
  font-size: 15px;
`;

// ==================================== 자세한 설명 부분 끝 ==============================

// ===================================== 카테고리 선택 =======================================
// 카테고리 선택 박스
export const PostUploadCategoryBox = styled.div`
  height: 130px;
  border-bottom: 1px solid grey;
  padding-bottom: 20px;
  padding: 30px 0;
`;
// 카테고리 선택 제목
export const CategoryTitle = styled.h1`
  font-size: 20px;
`;
// 카테고리 선택 input
export const InputCategory = styled.input`
  display: none;
`;
// 카테고리 선택 메뉴 박스
export const CategoryMenuBox = styled.div`
  margin-top: 10px;
  display: flex;
`;
// 카테고리 선택 버튼
export const CategoryBtn = styled.label`
  width: 100px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #a0a0a0;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
  background-color: ${(props) =>
    props.userSelectCategory !== "" ? props.userSelectCategory : "#a0a0a0"};
  color: ${(props) => (props.userSelectCategory !== "" ? "white" : "black")};
  & > span {
    margin-left: 5px;
  }
  &:nth-child(1),
  &:nth-child(2) {
    margin-right: 10px;
  }
`;

// ======================================  카테고리 선택 끝 =======================================

// 게시글에 올릴 정보를 모두 작성하고 클릭하는 완료 버튼
export const SubmitBtn = styled.input`
  width: 150px;
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
`;

export const PostUploadMapBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid grey;
  padding: 30px 0;
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
  width: 100%;
  height: 500px;
  border: 3px solid #a0a0a0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  & > span {
    cursor: pointer;
    color: white;
    font-size: 100px;
    color: black;
    &:hover {
      color: #a0a0a0;
    }
  }
`;
