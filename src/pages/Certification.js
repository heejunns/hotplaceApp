import { useState } from "react";
import * as CertificationStyle from "../styles/pages/CertificationStyle";
const Certification = () => {
  const [currentSelectCategory, setCurrentSelectCategory] = useState("cafe");
  console.log("cur", currentSelectCategory);
  const onchangeSelectCategory = ({ target: { id } }) => {
    console.log("value", id);
    setCurrentSelectCategory(id);
  };
  return (
    <CertificationStyle.CertificationBack>
      <CertificationStyle.CertificationBox>
        <CertificationStyle.CertificationItemBox>
          <CertificationStyle.CompanyNameLabel htmlFor="companyname">
            회사명
          </CertificationStyle.CompanyNameLabel>
          <CertificationStyle.CompanyNameInput id="companyname" />
        </CertificationStyle.CertificationItemBox>
        <CertificationStyle.CertificationItemBox>
          <CertificationStyle.CeoNameLabel>
            대표명
          </CertificationStyle.CeoNameLabel>
          <CertificationStyle.CeoNameInput />
        </CertificationStyle.CertificationItemBox>
        <CertificationStyle.CertificationItemBox>
          <CertificationStyle.CeoEmailLabel>
            대표 이메일
          </CertificationStyle.CeoEmailLabel>
          <CertificationStyle.CeoEmailInput />
        </CertificationStyle.CertificationItemBox>
        <CertificationStyle.CertificationItemBox>
          <CertificationStyle.CeoPhoneNumberLabel>
            대표 휴대폰 번호
          </CertificationStyle.CeoPhoneNumberLabel>
          <CertificationStyle.CeoPhoneNumberInput />
        </CertificationStyle.CertificationItemBox>

        <CertificationStyle.BusinessCategoryBox>
          {" "}
          <CertificationStyle.BusinessCategoryLabel
            htmlFor="cafe"
            currentSelectCategory={
              currentSelectCategory === "cafe" ? "black" : ""
            }
          >
            카페
            <CertificationStyle.BusinessCategoryInput
              id="cafe"
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
            음식
            <CertificationStyle.BusinessCategoryInput
              id="food"
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
            마트
            <CertificationStyle.BusinessCategoryInput
              id="mart"
              type="radio"
              onChange={onchangeSelectCategory}
            />
          </CertificationStyle.BusinessCategoryLabel>
        </CertificationStyle.BusinessCategoryBox>
      </CertificationStyle.CertificationBox>
    </CertificationStyle.CertificationBack>
  );
};

export default Certification;
