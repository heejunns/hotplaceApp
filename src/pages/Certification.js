import { useState } from "react";
import * as S from "../styles/pages/Certification.style";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { PreviewData } from "../recoils/UserAtom";
const Certification = () => {
  const [userCertificationData, setUserCertificationData] =
    useRecoilState(PreviewData);
  const navigate = useNavigate();
  const [currentSelectCategory, setCurrentSelectCategory] = useState("cafe");
  const [inputCompanyName, setInputCompanyName] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [certificationImageUrl, setCertificationImageUrl] = useState("");
  const [inputIntroduce, setInputIntroduce] = useState("");

  const onchangeInputText = ({ target: { id, value } }) => {
    if (id === "companyname") {
      setInputCompanyName(value);
    } else if (id === "name") {
      setInputName(value);
    } else if (id === "email") {
      setInputEmail(value);
    } else if (id === "phonenumber") {
      setInputPhoneNumber(value);
    } else if (id === "introduce") {
      setInputIntroduce(value);
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
  console.log("회사 소개 글", inputIntroduce);

  const onchangeCertificationImageUpload = useCallback(
    ({ target: { files } }) => {
      // 사진 파일을 선택했을때 선택한 사진을 화면에 보여주는 코드
      if (files.length === 1) {
        const uploadFile = files[0];
        // 파일을 읽어오기 위해서 fileReader API 를 사용하기
        const reader = new FileReader(); // 파일리더 생성
        reader.readAsDataURL(uploadFile); //  파일 url 생성
        reader.onloadend = (fileLoadEndEvent) => {
          setCertificationImageUrl((prev) => [
            ...prev,
            fileLoadEndEvent.target.result,
          ]);
        };
      } else {
        for (let i = 0; i < files.length; ++i) {
          const uploadFile = files[i];
          // 파일을 읽어오기 위해서 fileReader API 를 사용하기
          const reader = new FileReader(); // 파일리더 생성
          reader.readAsDataURL(uploadFile); //  파일 url 생성
          reader.onloadend = (fileLoadEndEvent) => {
            setCertificationImageUrl((prev) => [
              ...prev,
              fileLoadEndEvent.target.result,
            ]);
          };
        }
      }
    },
    []
  );
  const onclickImageDeleteBtn = useCallback((imageFileUrl) => {
    setCertificationImageUrl((prev) =>
      prev.filter((item) => item !== imageFileUrl)
    );
  }, []);
  const onclickCompleteBtn = () => {
    navigate("/preview");
    setUserCertificationData({
      companyName: inputCompanyName,
      name: inputName,
      email: inputEmail,
      phoneNumber: inputPhoneNumber,
      introduce: inputIntroduce,
      companyImage: certificationImageUrl,
    });
  };
  return (
    <S.CertificationBack>
      <S.CertificationFormBox>
        <S.CertificationItemBox>
          <S.CompanyNameLabel htmlFor="companyname">회사명</S.CompanyNameLabel>
          <S.CompanyNameInput
            id="companyname"
            value={inputCompanyName}
            type="text"
            placeholder="회사명을 입력해주세요."
            onChange={onchangeInputText}
          />
        </S.CertificationItemBox>
        <S.CertificationItemBox>
          <S.CeoNameLabel htmlFor="name">이름</S.CeoNameLabel>
          <S.CeoNameInput
            id="name"
            value={inputName}
            type="text"
            placeholder="대표님 이름을 적어주세요."
            onChange={onchangeInputText}
          />
        </S.CertificationItemBox>
        <S.CertificationItemBox>
          <S.CeoEmailInputTitleBox>
            <S.CeoEmailLabel htmlFor="email">이메일</S.CeoEmailLabel>
          </S.CeoEmailInputTitleBox>
          <S.CeoEmailInput
            id="email"
            value={inputEmail}
            type="text"
            placeholder="회사 이메일 또는 대표님 이메일을 적어주세요."
            onChange={onchangeInputText}
          />
        </S.CertificationItemBox>
        <S.CertificationItemBox>
          <S.CeoPhoneNumberInputTitleBox>
            <S.CeoPhoneNumberLabel htmlFor="phonenumber">
              휴대폰 번호
            </S.CeoPhoneNumberLabel>
          </S.CeoPhoneNumberInputTitleBox>

          <S.CeoPhoneNumberInput
            id="phonenumber"
            value={inputPhoneNumber}
            type="number"
            placeholder="대표님 휴대폰 전화번호를 적어주세요. - 빼고 입력 해주세요."
            onChange={onchangeInputText}
          />
        </S.CertificationItemBox>

        <S.BusinessCategoryBox>
          <S.BusinessCategoryTitle>업종 선택</S.BusinessCategoryTitle>
          <S.BusinessCategoryItemBox>
            <S.BusinessCategoryLabel
              htmlFor="cafe"
              currentSelectCategory={
                currentSelectCategory === "cafe" ? "black" : ""
              }
            >
              카페 <span className="material-symbols-outlined">local_cafe</span>
              <S.BusinessCategoryInput
                id="cafe"
                name="category"
                type="radio"
                onChange={onchangeSelectCategory}
              />
            </S.BusinessCategoryLabel>
            <S.BusinessCategoryLabel
              htmlFor="food"
              currentSelectCategory={
                currentSelectCategory === "food" ? "black" : ""
              }
            >
              음식 <span className="material-symbols-outlined">restaurant</span>
              <S.BusinessCategoryInput
                id="food"
                name="category"
                type="radio"
                onChange={onchangeSelectCategory}
              />
            </S.BusinessCategoryLabel>
            <S.BusinessCategoryLabel
              htmlFor="mart"
              currentSelectCategory={
                currentSelectCategory === "mart" ? "black" : ""
              }
            >
              마트 <span className="material-symbols-outlined">storefront</span>
              <S.BusinessCategoryInput
                id="mart"
                name="category"
                type="radio"
                onChange={onchangeSelectCategory}
              />
            </S.BusinessCategoryLabel>
          </S.BusinessCategoryItemBox>
        </S.BusinessCategoryBox>
        <S.PostUploadImageBox>
          <S.ImgFileSelectTitle>이미지 추가하기</S.ImgFileSelectTitle>

          <S.ImgFileSelectInput
            id="imageUploadInput"
            type="file"
            accept="image/*"
            onChange={onchangeCertificationImageUpload}
          />
          <S.SelectImgBox>
            <S.UploadEmptyImg htmlFor="imageUploadInput">
              <span className="material-symbols-outlined">
                create_new_folder
              </span>
            </S.UploadEmptyImg>
            {certificationImageUrl &&
              certificationImageUrl.map((item) => {
                return (
                  <S.ImgItem>
                    <S.UploadImg src={item} alt="uploadImg" />
                    <S.UploadImgDeleteBtn
                      type="button"
                      onClick={() => onclickImageDeleteBtn(item)}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </S.UploadImgDeleteBtn>
                  </S.ImgItem>
                );
              })}
          </S.SelectImgBox>
        </S.PostUploadImageBox>
        <S.IntroduceBox>
          <S.IntroduceTitle htmlFor="introduce">매장 소개 글</S.IntroduceTitle>
          <S.IntroduceTextInput
            id="introduce"
            placeholder="매장 소개글을 작성해주세요."
            type="text"
            value={inputIntroduce}
            onChange={onchangeInputText}
          />
        </S.IntroduceBox>
        <S.CertificationBtnBox>
          <S.CertificationSubmitBtn onClick={onclickCompleteBtn}>
            완료
          </S.CertificationSubmitBtn>
        </S.CertificationBtnBox>
      </S.CertificationFormBox>
    </S.CertificationBack>
  );
};

export default Certification;
