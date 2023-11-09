import { useState } from "react";
import * as CertificationStyle from "../styles/pages/CertificationStyle";
const Certification = () => {
  const [currentSelectCategory, setCurrentSelectCategory] = useState("cafe");
  const [inputCompanyName, setInputCompanyName] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");

  const onchangeInputText = ({ target: { id, value } }) => {
    if (id === "companyname") {
      setInputCompanyName(value);
    } else if (id === "name") {
      setInputName(value);
    } else if (id === "email") {
      setInputEmail(value);
    } else if (id === "phonenumber") {
      setInputPhoneNumber(value);
    }
  };
  const onchangeSelectCategory = ({ target: { id } }) => {
    console.log("value", id);
    setCurrentSelectCategory(id);
  };
  console.log("회사이름", inputCompanyName);
  console.log("이름", inputName);
  console.log("이메일", inputEmail);
  console.log("휴대폰번호", inputPhoneNumber);

  return (
    <CertificationStyle.CertificationBack>
      <CertificationStyle.CertificationFormBox>
        <CertificationStyle.CertificationItemBox>
          <CertificationStyle.CompanyNameLabel htmlFor="companyname">
            회사명
          </CertificationStyle.CompanyNameLabel>
          <CertificationStyle.CompanyNameInput
            id="companyname"
            value={inputCompanyName}
            type="text"
            placeholder="회사명을 입력해주세요."
            onChange={onchangeInputText}
          />
        </CertificationStyle.CertificationItemBox>
        <CertificationStyle.CertificationItemBox>
          <CertificationStyle.CeoNameLabel htmlFor="name">
            이름
          </CertificationStyle.CeoNameLabel>
          <CertificationStyle.CeoNameInput
            id="name"
            value={inputName}
            type="text"
            placeholder="대표님 이름을 적어주세요."
            onChange={onchangeInputText}
          />
        </CertificationStyle.CertificationItemBox>
        <CertificationStyle.CertificationItemBox>
          <CertificationStyle.CeoEmailInputTitleBox>
            <CertificationStyle.CeoEmailLabel htmlFor="email">
              이메일
            </CertificationStyle.CeoEmailLabel>
          </CertificationStyle.CeoEmailInputTitleBox>
          <CertificationStyle.CeoEmailInput
            id="email"
            value={inputEmail}
            type="text"
            placeholder="회사 이메일 또는 대표님 이메일을 적어주세요."
            onChange={onchangeInputText}
          />
        </CertificationStyle.CertificationItemBox>
        <CertificationStyle.CertificationItemBox>
          <CertificationStyle.CeoPhoneNumberInputTitleBox>
            <CertificationStyle.CeoPhoneNumberLabel htmlFor="phonenumber">
              휴대폰 번호
            </CertificationStyle.CeoPhoneNumberLabel>
          </CertificationStyle.CeoPhoneNumberInputTitleBox>

          <CertificationStyle.CeoPhoneNumberInput
            id="phonenumber"
            value={inputPhoneNumber}
            type="number"
            placeholder="대표님 휴대폰 전화번호를 적어주세요. - 빼고 입력 해주세요."
            onChange={onchangeInputText}
          />
        </CertificationStyle.CertificationItemBox>

        <CertificationStyle.BusinessCategoryBox>
          <CertificationStyle.BusinessCategoryTitle>
            업종 선택
          </CertificationStyle.BusinessCategoryTitle>
          <CertificationStyle.BusinessCategoryItemBox>
            <CertificationStyle.BusinessCategoryLabel
              htmlFor="cafe"
              currentSelectCategory={
                currentSelectCategory === "cafe" ? "black" : ""
              }
            >
              카페 <span className="material-symbols-outlined">local_cafe</span>
              <CertificationStyle.BusinessCategoryInput
                id="cafe"
                name="category"
                type="radio"
                onChange={onchangeSelectCategory}
              />
            </CertificationStyle.BusinessCategoryLabel>
            <CertificationStyle.BusinessCategoryLabel
              htmlFor="food"
              currentSelectCategory={
                currentSelectCategory === "food" ? "black" : ""
              }
            >
              음식 <span className="material-symbols-outlined">restaurant</span>
              <CertificationStyle.BusinessCategoryInput
                id="food"
                name="category"
                type="radio"
                onChange={onchangeSelectCategory}
              />
            </CertificationStyle.BusinessCategoryLabel>
            <CertificationStyle.BusinessCategoryLabel
              htmlFor="mart"
              currentSelectCategory={
                currentSelectCategory === "mart" ? "black" : ""
              }
            >
              마트 <span className="material-symbols-outlined">storefront</span>
              <CertificationStyle.BusinessCategoryInput
                id="mart"
                name="category"
                type="radio"
                onChange={onchangeSelectCategory}
              />
            </CertificationStyle.BusinessCategoryLabel>
          </CertificationStyle.BusinessCategoryItemBox>
        </CertificationStyle.BusinessCategoryBox>
        <CertificationStyle.CertificationBtnBox>
          <CertificationStyle.CertificationSubmitBtn>
            제출하기
          </CertificationStyle.CertificationSubmitBtn>
        </CertificationStyle.CertificationBtnBox>
      </CertificationStyle.CertificationFormBox>
    </CertificationStyle.CertificationBack>
  );
};

export default Certification;
