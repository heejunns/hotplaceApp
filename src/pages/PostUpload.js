import React, { useCallback, useState } from "react";
import { dbService, storageService } from "../reactfbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
// uuid 를 사용해서 고유 이름을 생성
import { addDoc, collection } from "firebase/firestore";
import Map from "../components/Map";
import { useNavigate } from "react-router-dom";
import { currentPageAtom, userAtom, userLocation } from "../recoils/UserAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import * as S from "../styles/pages/PostUpload.style";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import PostUploadFailModal from "../components/PostUploadFailModal";
import FindAddress from "../components/FindAddress";
import { useMutation } from "@tanstack/react-query";

const PostUpload = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const location = useRecoilValue(userLocation);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate(); // useNavigate 훅스를 사용해서 게시글을 올리면 "/" 주소로 강제 이동
  const [inputText, setInputText] = useState(""); // input 태그에 입력하는 value 의 state
  const [uploadImageFileURL, setUploadImageFileURL] = useState(""); // 업로드 하려는 이미지의 주소를 저장
  const [mapStatus, setMapStatus] = useState(false); // 게시글을 작성할 때 매장의 주소를 기록할지 여부
  const [userSelectCategory, setUserSelectCategory] = useState("cafe"); // 사용자가 글을 게시할때 사용자의 주소
  const [userMarkerLocation, setUserMarkerLocation] = useState([]); // 사용자가 맵에 마커한 매장의 주소
  const [inputPostTitle, setInputPostTitle] = useState("");
  const [isPostUploadFailModal, setIsPostUploadFailModal] = useState(false);
  const [failText, setFailText] = useState("");
  // 매장 이름 작성하는 input 태그에 걸어 둔 onchange 함수
  const onchangeInputPostTitle = ({ target: { value } }) => {
    if (value.length > 20) {
      return;
    }
    setInputPostTitle(value);
  };

  // 자세한 설명 작성하는 textarea 태그에 걸어 둔 onchange 함수
  const onchangeInputText = useCallback(({ target: { value } }) => {
    if (value.length > 100) {
      return;
    }
    setInputText(value);
  }, []);

  // 게시글에 올리는 가게의 종류를 고르면 호출되는(라디오) onchange 콜백 함수
  const onchangeUserSelectCategory = useCallback(({ target: { id } }) => {
    setUserSelectCategory(id);
  }, []);
  // 작성한 글을 등록하기 위해 버튼을 클릭했을때 호출되는 콜백함수
  const onSubmitBtn = async (e) => {
    e.preventDefault();
    try {
      if (inputPostTitle === "") {
        setFailText("매장 이름을 입력해 주세요");
        setIsPostUploadFailModal((prev) => !prev);
        document.body.style.overflow = "hidden";
        return;
      }
      if (uploadImageFileURL === "" || uploadImageFileURL.length === 0) {
        setFailText("사진을 등록 해주세요");
        setIsPostUploadFailModal((prev) => !prev);
        document.body.style.overflow = "hidden";
        return;
      }
      if (userMarkerLocation.length === 0) {
        setFailText("장소를 등록 해주세요");
        setIsPostUploadFailModal((prev) => !prev);
        document.body.style.overflow = "hidden";
        return;
      }
      if (inputText.length === 0) {
        setFailText("자세한 설명을 작성 해주세요");
        setIsPostUploadFailModal((prev) => !prev);
        document.body.style.overflow = "hidden";
        return;
      }
      let getUploadFileURL = [];
      if (uploadImageFileURL.length > 0) {
        // 이미지 url 이 있다면 이미지가 있다는 뜻이니까
        const storageRefArr = uploadImageFileURL.map((item) => {
          return ref(storageService, `${user.uid}/${uuidv4()}`); // 이미지 storage 에 저장
        });
        const uploadFunc = storageRefArr.map((item, index) => {
          return uploadString(item, uploadImageFileURL[index], "data_url");
        });
        await axios.all(uploadFunc);
        const downloadFunc = storageRefArr.map((item) => {
          return getDownloadURL(item);
        }); // 이미지 url 불러오기

        const uploadUrls = await axios.all(downloadFunc);
        getUploadFileURL.push(...uploadUrls);
      }
      await addDoc(collection(dbService, "test"), {
        // 데이터베이스에 저장
        inputText, // 게시글
        createTime: Date.now(), // 생성 날짜
        writer: user.uid, // 작성한 작성자의 uid
        writerProfileImg: user.providerData[0].photoURL,
        uploadImgUrl: getUploadFileURL, // 업로드한 이미지의 url
        nickname: user.displayName, // 작성자의 닉네임
        location: userMarkerLocation, // 작성자가 맵에 마커한 위치 정보
        category:
          userSelectCategory === "cafe"
            ? "카페"
            : userSelectCategory === "food"
            ? "음식"
            : userSelectCategory === "mart"
            ? "마트"
            : null, // 작성자가 선택한 카테고리 종류
        likeMember: [], // 좋아요 누른 사람의 명단
        likeNumber: 0,
        comments: [], // 댓글 정보
        userLocation: location, // 유저 주소, 이 정보로 지역 게시물만 보기 기능 만들거임
        postName: inputPostTitle,
      });
      setInputPostTitle("");
      setInputText("");
      setUploadImageFileURL("");
      navigate("/");
      setCurrentPage(1);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const { isLoading: submitIsLoading, mutate: submitBtnClick } = useMutation({
    onSubmitBtn,
  });
  const onchangeImageUpload = useCallback(({ target: { files } }) => {
    // 사진 파일을 선택했을때 선택한 사진을 화면에 보여주는 코드
    if (files.length === 1) {
      const uploadFile = files[0];
      // 파일을 읽어오기 위해서 fileReader API 를 사용하기
      const reader = new FileReader(); // 파일리더 생성
      reader.readAsDataURL(uploadFile); //  파일 url 생성
      reader.onloadend = (fileLoadEndEvent) => {
        setUploadImageFileURL((prev) => [
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
          setUploadImageFileURL((prev) => [
            ...prev,
            fileLoadEndEvent.target.result,
          ]);
        };
      }
    }
  }, []);

  // 선택한 이미지를 삭제 버튼을 클릭하면 호출
  const onclickUploadFileDelete = useCallback((imageFileUrl) => {
    setUploadImageFileURL((prev) =>
      prev.filter((item) => item !== imageFileUrl)
    );
  }, []);

  // 맵을 화면에 보여주기 위한 버튼을 클릭하였을 때 호출
  const onclickMapButton = useCallback(() => {
    setMapStatus((prev) => !prev);
  }, []);
  return (
    <>
      <S.PostUploadBack>
        <S.PostUploadFormContainer onSubmit={submitBtnClick}>
          <S.PostUploadPostNameBox>
            <S.PostUploadPostNameTitleBox>
              <S.PostUploadPostNameTitle>매장 이름</S.PostUploadPostNameTitle>
              <span>
                <S.InputTextCurrentNumber>
                  {inputPostTitle.length}
                </S.InputTextCurrentNumber>{" "}
                / 20
              </span>
              {inputPostTitle.length === 20 && (
                <S.InputTextLimitText>
                  20 글자를 초과해서 입력 할 수 없습니다
                </S.InputTextLimitText>
              )}
            </S.PostUploadPostNameTitleBox>

            <S.PostUploadPostNameInput
              type="text"
              value={inputPostTitle}
              onChange={onchangeInputPostTitle}
              placeholder="매장 이름을 작성해주세요."
            />
          </S.PostUploadPostNameBox>
          <S.PostUploadImageBox>
            <S.ImgFileSelectTitle>이미지 추가하기</S.ImgFileSelectTitle>

            <S.ImgFileSelectInput
              id="imageUploadInput"
              type="file"
              accept="image/*"
              onChange={onchangeImageUpload}
            />
            <S.SelectImgBox>
              <S.UploadEmptyImg htmlFor="imageUploadInput">
                <span className="material-symbols-outlined">
                  create_new_folder
                </span>
              </S.UploadEmptyImg>
              {uploadImageFileURL &&
                uploadImageFileURL.map((item) => {
                  return (
                    <S.ImgItem>
                      <S.UploadImg src={item} alt="uploadImg" />
                      <S.UploadImgDeleteBtn
                        type="button"
                        onClick={() => onclickUploadFileDelete(item)}
                      >
                        <span className="material-symbols-outlined">close</span>
                      </S.UploadImgDeleteBtn>
                    </S.ImgItem>
                  );
                })}
            </S.SelectImgBox>
          </S.PostUploadImageBox>
          <S.PostUploadCategoryBox>
            <S.CategoryTitle>카테고리 선택</S.CategoryTitle>
            <S.CategoryMenuBox>
              <S.CategoryBtn
                htmlFor="cafe"
                userSelectCategory={
                  userSelectCategory === "cafe" ? "black" : ""
                }
              >
                카페{" "}
                <span className="material-symbols-outlined">local_cafe</span>
                <S.InputCategory
                  id="cafe"
                  type="radio"
                  name="category"
                  onChange={onchangeUserSelectCategory}
                />
              </S.CategoryBtn>
              <S.CategoryBtn
                htmlFor="food"
                userSelectCategory={
                  userSelectCategory === "food" ? "black" : ""
                }
              >
                음식{" "}
                <span className="material-symbols-outlined">restaurant</span>
                <S.InputCategory
                  id="food"
                  type="radio"
                  name="category"
                  onChange={onchangeUserSelectCategory}
                />
              </S.CategoryBtn>
              <S.CategoryBtn
                htmlFor="mart"
                userSelectCategory={
                  userSelectCategory === "mart" ? "black" : ""
                }
              >
                마트{" "}
                <span className="material-symbols-outlined">storefront</span>
                <S.InputCategory
                  id="mart"
                  type="radio"
                  name="category"
                  onChange={onchangeUserSelectCategory}
                />
              </S.CategoryBtn>
            </S.CategoryMenuBox>
          </S.PostUploadCategoryBox>
          <S.PostUploadInputTextBox>
            <S.PostUploadInputTextBoxTitleBox>
              <S.InputTextBoxTitle>자세한 설명</S.InputTextBoxTitle>
              <span>
                <S.InputTextCurrentNumber>
                  {inputText.length}
                </S.InputTextCurrentNumber>{" "}
                / 100
              </span>
              {inputText.length === 100 && (
                <S.InputTextLimitText>
                  100 글자를 초과해서 입력 할 수 없습니다
                </S.InputTextLimitText>
              )}
            </S.PostUploadInputTextBoxTitleBox>

            <S.InputPostText
              type="text"
              value={inputText}
              onChange={onchangeInputText}
              placeholder="업로드 하고 싶은 글을 작성 해주세요."
            />
          </S.PostUploadInputTextBox>
          <S.PostUploadMapBox>
            <S.MapBoxTitle>장소 등록하기</S.MapBoxTitle>
            <S.MapBox>
              {mapStatus ? (
                <Map setUserMarkerLocation={setUserMarkerLocation} />
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={onclickMapButton}
                >
                  add_location_alt
                </span>
              )}
            </S.MapBox>
          </S.PostUploadMapBox>
          {/* <FindAddress /> */}
          <S.PostUploadSubmitBox>
            <S.SubmitBtn type="submit" value="게시글 올리기" />
          </S.PostUploadSubmitBox>
        </S.PostUploadFormContainer>
      </S.PostUploadBack>
      {submitIsLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
      {isPostUploadFailModal && (
        <PostUploadFailModal
          failText={failText}
          setIsPostUploadFailModal={setIsPostUploadFailModal}
        />
      )}
    </>
  );
};

export default PostUpload;
