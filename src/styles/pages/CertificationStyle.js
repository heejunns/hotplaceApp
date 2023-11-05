import styled from "styled-components";

export const CertificationBack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const CertificationBox = styled.div`
  border: 1px solid black;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`;

export const LabelElement = styled.label`
  font-size: 20px;
`;
export const InputElement = styled.input`
  border: 2px solid #a0a0a0;
  border-radius: 10px;
  height: 50px;
  padding: 10px;
  &:focus {
    border: 2px solid #6edcdc;
  }
`;
export const CertificationItemBox = styled.div`
  display: flex;
  flex-direction: column;
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
`;

export const BusinessCategoryInput = styled.input`
  display: none;
`;

export const BusinessCategoryLabel = styled(LabelElement)`
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
    props.currentSelecetCategory !== ""
      ? props.currentSelectCategory
      : "#a0a0a0"};
  color: ${(props) =>
    props.currentSelecetCategory !== "" ? "white" : "black"};
  & > span {
    margin-left: 5px;
  }
  &:nth-child(1),
  &:nth-child(2) {
    margin-right: 10px;
  }
`;
