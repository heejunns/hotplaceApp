import styled from "styled-components";

export const CertificationBack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 0px 10px 20px 10px;
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
  font-size: 30px;
`;
export const InputElement = styled.input`
  margin-top: 10px;
  border: 2px solid #a0a0a0;
  border-radius: 10px;
  height: 50px;
  padding: 10px;
  &:focus {
    border: 2px solid #6edcdc;
  }
`;
export const CertificationItemBox = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid grey;
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
  font-size: 30px;
`;

export const BusinessCategoryItemBox = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid grey;
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
  /* width: 100%; */
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;
