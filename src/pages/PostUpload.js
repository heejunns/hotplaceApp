import React, { useCallback, useState } from "react";
import { dbService, storageService } from "../reactfbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
// uuid 를 사용해서 고유 이름을 생성
import { addDoc, collection } from "firebase/firestore";
import Map from "../components/Map";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../recoils/UserAtom";
import { useRecoilValue } from "recoil";
import * as PostUploadStyle from "../styles/PostUploadStyle";

const PostUpload = ({ userLocation }) => {
  const user = useRecoilValue(userAtom);

  const navigate = useNavigate(); // useNavigate 훅스를 사용해서 게시글을 올리면 "/" 주소로 강제 이동
  const [inputText, setInputText] = useState(""); // input 태그에 입력하는 value 의 state
  const [uploadImageFileURL, setUploadImageFileURL] = useState(""); // 업로드 하려는 이미지의 주소를 저장
  const [mapStatus, setMapStatus] = useState(false); // 게시글을 작성할 때 매장의 주소를 기록할지 여부
  const [userSelectCategory, setUserSelectCategory] = useState("cafe"); // 사용자가 글을 게시할때 사용자의 주소
  const [userMarkerLocation, setUserMarkerLocation] = useState([]); // 사용자가 맵에 마커한 매장의 주소
  // 트윗 작성 input 태그의 onchange 이벤트 콜백 함수
  const onchangeInputText = useCallback((event) => {
    const {
      target: { value },
    } = event;
    if (value.length > 100) {
      return;
    }
    setInputText(value);
  }, []);

  // 게시글에 올리는 가게의 종류를 고르면 호출되는(라디오) onchange 콜백 함수
  const onchangeUserSelectCategory = useCallback((event) => {
    const {
      target: { id },
    } = event;
    setUserSelectCategory(id);
  }, []);
  // 작성한 글을 등록하기 위해 버튼을 클릭했을때 호출되는 콜백함수
  const onsubmitButtonClick = async (e) => {
    e.preventDefault();
    try {
      let getUploadFileURL = "";
      if (uploadImageFileURL !== "") {
        // 이미지 url 이 있다면 이미지가 있다는 뜻이니까
        console.log("hello world!");
        const storageRef = ref(storageService, `${user.uid}/${uuidv4()}`); // 이미지 storage 에 저장
        console.log("hello world! storge", storageRef);
        await uploadString(storageRef, uploadImageFileURL, "data_url");

        getUploadFileURL = await getDownloadURL(storageRef); // 이미지 url 불러오기
      }

      await addDoc(collection(dbService, "test"), {
        // 데이터베이스에 저장
        inputText, // 게시글
        createTime: Date.now(), // 생성 날짜
        writer: user.uid, // 작성한 작성자의 uid
        getUploadFileURL, // 업로드한 이미지의 url
        nickname: user.displayName, // 작성자의 닉네임
        userMarkerLocation, // 작성자가 맵에 마커한 위치 정보
        userSelectCategory, // 작성자가 선택한 카테고리 종류
        likeMember: [], // 좋아요 누른 사람의 명단
        likeNumber: 0,
        comments: [], // 댓글 정보
        userLocation, // 유저 주소, 이 정보로 지역 게시물만 보기 기능 만들거임
      });

      setInputText("");
      setUploadImageFileURL("");
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const onchangeImageUpload = useCallback((event) => {
    // 사진 파일을 선택했을때 선택한 사진을 화면에 보여주는 코드
    const {
      target: { files },
    } = event;
    const uploadFile = files[0];
    // 파일을 읽어오기 위해서 fileReader API 를 사용하기
    const reader = new FileReader(); // 파일리더 생성
    reader.readAsDataURL(uploadFile); //  파일 url 생성
    reader.onloadend = (fileLoadEndEvent) => {
      // 파일리더에 파일 업로드가 끝나는지 리스너를 달아서 업로드가 끝나면 콜백함수에 업로드 된 객체가 전달되어 콜백함수가 호출
      setUploadImageFileURL(fileLoadEndEvent.target.result);
    };
  }, []);
  // 선택한 이미지를 삭제 버튼을 클릭하면 호출
  const onclickUploadFileDelete = useCallback(() => {
    setUploadImageFileURL("");
  }, []);
  // 맵을 화면에 보여주기 위한 버튼을 클릭하였을 때 호출
  const onclickMapButton = useCallback(() => {
    setMapStatus((prev) => !prev);
  }, []);
  return (
    <PostUploadStyle.PostUploadBack>
      <PostUploadStyle.PostUploadForm onSubmit={onsubmitButtonClick}>
        <PostUploadStyle.PostUploadImageBox>
          <PostUploadStyle.ImgFileSelectTitle>
            이미지 추가하기
          </PostUploadStyle.ImgFileSelectTitle>
          <PostUploadStyle.ImgFileSelectInput
            id="imageUploadInput"
            type="file"
            accept="image/*"
            onChange={onchangeImageUpload}
          />
          {uploadImageFileURL ? (
            <PostUploadStyle.UploadImgBox>
              <PostUploadStyle.UploadImg
                src={uploadImageFileURL}
                alt="uploadImg"
              />
              <PostUploadStyle.UploadImgDeleteBtn
                type="button"
                onClick={onclickUploadFileDelete}
              >
                &#215;
              </PostUploadStyle.UploadImgDeleteBtn>
            </PostUploadStyle.UploadImgBox>
          ) : (
            <PostUploadStyle.UploadEmptyImg htmlFor="imageUploadInput">
              <span class="material-symbols-outlined">create_new_folder</span>
            </PostUploadStyle.UploadEmptyImg>
          )}
        </PostUploadStyle.PostUploadImageBox>
        <PostUploadStyle.PostUploadCategoryBox>
          <PostUploadStyle.CategoryTitle>
            카테고리 선택
          </PostUploadStyle.CategoryTitle>
          <PostUploadStyle.CategoryMenu>
            <PostUploadStyle.CategoryBtn
              htmlFor="cafe"
              userSelectCategory={
                userSelectCategory === "cafe" ? "mediumorchid" : ""
              }
            >
              카페
              <PostUploadStyle.InputCategory
                id="cafe"
                type="radio"
                name="cafe"
                onChange={onchangeUserSelectCategory}
              />
            </PostUploadStyle.CategoryBtn>
            <PostUploadStyle.CategoryBtn
              htmlFor="food"
              userSelectCategory={
                userSelectCategory === "food" ? "mediumorchid" : ""
              }
            >
              음식
              <PostUploadStyle.InputCategory
                id="food"
                type="radio"
                name="cafe"
                onChange={onchangeUserSelectCategory}
              />
            </PostUploadStyle.CategoryBtn>
            <PostUploadStyle.CategoryBtn
              htmlFor="mart"
              userSelectCategory={
                userSelectCategory === "mart" ? "mediumorchid" : ""
              }
            >
              마트
              <PostUploadStyle.InputCategory
                id="mart"
                type="radio"
                name="cafe"
                onChange={onchangeUserSelectCategory}
              />
            </PostUploadStyle.CategoryBtn>
          </PostUploadStyle.CategoryMenu>
        </PostUploadStyle.PostUploadCategoryBox>
        <PostUploadStyle.PostUploadInputTextBox>
          <PostUploadStyle.PostUploadInputTextBoxTitleBox>
            <PostUploadStyle.InputTextBoxTitle>
              자세한 설명
            </PostUploadStyle.InputTextBoxTitle>
            <span>
              <PostUploadStyle.InputTextNumberLimit>
                {inputText.length}
              </PostUploadStyle.InputTextNumberLimit>{" "}
              / 100
            </span>
            {inputText.length === 100 && (
              <PostUploadStyle.InputTextLimitText>
                100 글자를 초과해서 입력 할 수 없습니다
              </PostUploadStyle.InputTextLimitText>
            )}
          </PostUploadStyle.PostUploadInputTextBoxTitleBox>

          <PostUploadStyle.InputPostText
            type="text"
            value={inputText}
            onChange={onchangeInputText}
            placeholder="업로드 하고 싶은 글을 작성 해주세요."
          />
        </PostUploadStyle.PostUploadInputTextBox>
        <PostUploadStyle.PostUploadMapBox>
          <PostUploadStyle.MapBoxTitle>
            장소 지정하기
          </PostUploadStyle.MapBoxTitle>
          <PostUploadStyle.MapBox>
            {mapStatus ? (
              <Map setUserMarkerLocation={setUserMarkerLocation} />
            ) : (
              <span
                class="material-symbols-outlined"
                onClick={onclickMapButton}
              >
                add_location_alt
              </span>
            )}
          </PostUploadStyle.MapBox>
        </PostUploadStyle.PostUploadMapBox>

        <PostUploadStyle.PostUploadSubmitBox>
          <PostUploadStyle.SubmitBtn type="submit" value="완료" />
        </PostUploadStyle.PostUploadSubmitBox>
      </PostUploadStyle.PostUploadForm>
    </PostUploadStyle.PostUploadBack>
  );
};

export default PostUpload;
