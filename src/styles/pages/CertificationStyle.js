import styled from "styled-components";

export const CertificationBack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 60px 20px 40px 20px;
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;

export const CertificationFormBox = styled.form`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    margin-top: 30px;
  }
`;

export const LabelElement = styled.label`
  font-size: 20px;
`;
export const InputElement = styled.input`
  margin-top: 10px;
  border: 2px solid #a0a0a0;
  border-radius: 10px;
  height: 50px;
  padding: 10px;
  &:focus {
    border: 3px solid #6edcdc;
  }
`;
export const CertificationItemBox = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const CompanyNameLabel = styled(LabelElement)``;
export const CompanyNameInput = styled(InputElement)``;
export const CeoNameLabel = styled(LabelElement)``;
export const CeoNameInput = styled(InputElement)``;

export const CeoPhoneNumberInput = styled(InputElement)``;

export const CeoPhoneNumberLabel = styled(LabelElement)``;

export const CeoEmailInput = styled(InputElement)``;

export const CeoEmailLabel = styled(LabelElement)``;

export const BusinessCategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;

export const BusinessCategoryInput = styled.input`
  display: none;
`;

export const BusinessCategoryLabel = styled(LabelElement)`
  font-size: 18px;
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
    props.currentSelectCategory === "black"
      ? props.currentSelectCategory
      : "#a0a0a0"};
  color: ${(props) =>
    props.currentSelectCategory === "black" ? "white" : "black"};
  & > span {
    margin-left: 5px;
  }
  &:nth-child(1),
  &:nth-child(2) {
    margin-right: 10px;
  }
`;

export const BusinessCategoryTitle = styled.h1`
  font-size: 20px;
`;

export const BusinessCategoryItemBox = styled.div`
  padding-bottom: 20px;
  margin-top: 10px;
  width: 100%;
  display: flex;
`;
export const CertificationBtnBox = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const CertificationSubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const CeoEmailInputTitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const InputEmailCheckText = styled.h1`
  margin-left: 10px;
`;

export const CeoPhoneNumberInputTitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const InputCeoPhoneNumberCheckText = styled.h1`
  font-size: 15px;
`;
// 이미지 업로드 부분 박스
export const PostUploadImageBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  height: 160px;
  padding: 10px 0;
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
// 선택한 이미지를 보여주는 박스
export const SelectImgBox = styled.div`
  height: 120px;
  overflow-y: scroll;
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
export const ImgItem = styled.div`
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
