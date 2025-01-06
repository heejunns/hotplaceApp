import React, { useCallback, useEffect, useState } from "react";
import { dbService, storageService } from "../reactfbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
// uuid 를 사용해서 고유 이름을 생성
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { currentPageAtom, userAtom, userLocation } from "../recoils/UserAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import * as S from "../styles/pages/PostUpload.style";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import PostUploadFailModal from "../components/PostUploadFailModal";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import InputPostName from "../components/PostUpload/InputPostName";
import InputPostImage from "../components/PostUpload/InputPostImage";
import InputPostDescription from "../components/PostUpload/InputPostDescription";
import InputPostCategory from "../components/PostUpload/InputPostCategory";
import { DevTool } from "@hookform/devtools";

const PostUpload = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    control,
  } = useForm({
    defaultValues: {
      postName: "",
      inputText: "",
      category: "카페",
    },
  });
  console.log(errors);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate(); // useNavigate 훅스를 사용해서 게시글을 올리면 "/" 주소로 강제 이동
  const [uploadImageFileURL, setUploadImageFileURL] = useState(""); // 업로드 하려는 이미지의 주소를 저장
  const [userSelectCategory, setUserSelectCategory] = useState("cafe"); // 사용자가 글을 게시할때 사용자의 주소
  const [isPostUploadFailModal, setIsPostUploadFailModal] = useState(false);
  // console.log(userMarkerLocation);
  // 게시글에 올리는 가게의 종류를 고르면 호출되는(라디오) onchange 콜백 함수
  const onchangeUserSelectCategory = useCallback(({ target: { id } }) => {
    setUserSelectCategory(id);
    setValue(
      "category",
      id === "cafe" ? "카페" : id === "food" ? "음식" : null // 작성자가 선택한 카테고리 종류););)
    );
  }, []);
  // 작성한 글을 등록하기 위해 버튼을 클릭했을때 호출되는 콜백함수
  const onSubmitBtn = async (data) => {
    if (uploadImageFileURL.length === 0) {
      return;
    }
    console.log("hello");
    console.log(data);
    // e.preventDefault();
    try {
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
        inputText: data.inputText, // 게시글
        createTime: Date.now(), // 생성 날짜
        writer: user.uid, // 작성한 작성자의 uid
        writerProfileImg: user.providerData[0].photoURL,
        uploadImgUrl: getUploadFileURL, // 업로드한 이미지의 url
        nickname: user.displayName, // 작성자의 닉네임
        category: data.category,
        likeMember: [], // 좋아요 누른 사람의 명단
        likeNumber: 0,
        comments: [], // 댓글 정보
        postName: data.postName,
      });
      setUploadImageFileURL("");
      navigate("/");
    } catch (error) {
      console.error("Error", error);
    }
  };
  // const { isLoading: submitIsLoading, mutate: submitBtnClick } = useMutation({
  //   onSubmitBtn,
  // });

  console.log(errors);
  return (
    <>
      <S.PostUploadBack>
        <S.PostUploadForm onSubmit={handleSubmit(onSubmitBtn)} noValidate>
          <InputPostName register={register} />
          <S.ErrorMsg>
            {errors && errors.postName?.message
              ? errors.postName?.message
              : null}
          </S.ErrorMsg>
          <InputPostImage
            register={register}
            setValue={setValue}
            uploadImageFileURL={uploadImageFileURL}
            setUploadImageFileURL={setUploadImageFileURL}
          />
          <S.ErrorMsg>
            {uploadImageFileURL.length > 0 ? "" : "사진을 추가해주세요."}
          </S.ErrorMsg>
          <InputPostDescription register={register} />
          <S.ErrorMsg>
            {errors && errors.inputText?.message
              ? errors.inputText?.message
              : null}
          </S.ErrorMsg>
          <InputPostCategory
            register={register}
            userSelectCategory={userSelectCategory}
            onchangeUserSelectCategory={onchangeUserSelectCategory}
          />

          {/* <FindAddress /> */}

          <S.PostUploadSubmitBox>
            <S.SubmitBtn type="submit" value="작성 완료" />
          </S.PostUploadSubmitBox>
        </S.PostUploadForm>
      </S.PostUploadBack>
      {isSubmitting && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}

      <DevTool control={control} />
    </>
  );
};

export default PostUpload;
