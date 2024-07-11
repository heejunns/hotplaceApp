import { useCallback } from "react";
import {
  InputPostImageBox,
  InputTitle,
  UploadEmptyImg,
  UploadImageInput,
  UploadImg,
  UploadImgBox,
  UploadImgDeleteBtn,
  UploadImgItem,
} from "../../styles/pages/PostUpload.style";

const InputPostImage = ({
  uploadImageFileURL,
  setUploadImageFileURL,
  register,
  setValue,
}) => {
  const onchangeImageUpload = useCallback(({ target: { files } }) => {
    // 사진 파일을 선택했을때 선택한 사진을 화면에 보여주는 코드
    if (files.length === 1) {
      const uploadFile = files[0];
      // 파일을 읽어오기 위해서 fileReader API 를 사용하기
      const reader = new FileReader(); // 파일리더 생성
      reader.readAsDataURL(uploadFile); //  파일 url 생성
      reader.onloadend = (fileLoadEndEvent) => {
        console.log(fileLoadEndEvent.target.result);
        setUploadImageFileURL([fileLoadEndEvent.target.result]);
        setValue("uploadImgurl", fileLoadEndEvent.target.result);
      };
    } else {
      for (let i = 0; i < files.length; ++i) {
        const uploadFile = files[i];
        // 파일을 읽어오기 위해서 fileReader API 를 사용하기
        const reader = new FileReader(); // 파일리더 생성
        reader.readAsDataURL(uploadFile); //  파일 url 생성
        reader.onloadend = (fileLoadEndEvent) => {
          setUploadImageFileURL([fileLoadEndEvent.target.result]);
          setValue("uploadImgUrl", fileLoadEndEvent.target.result);
        };
      }
    }
  }, []);
  return (
    <InputPostImageBox>
      <InputTitle>사진 추가</InputTitle>

      <UploadImageInput
        id="imageUploadInput"
        type="file"
        accept="image/*"
        onChange={onchangeImageUpload}
      />
      <UploadImgBox>
        <UploadEmptyImg htmlFor="imageUploadInput">
          <span className="material-symbols-outlined">create_new_folder</span>
        </UploadEmptyImg>
        {uploadImageFileURL &&
          uploadImageFileURL.map((item) => {
            return (
              <UploadImgItem>
                <UploadImg src={item} alt="uploadImg" />
                <UploadImgDeleteBtn
                  type="button"
                  //   onClick={() => onclickUploadFileDelete(item)}
                >
                  <span className="material-symbols-outlined">close</span>
                </UploadImgDeleteBtn>
              </UploadImgItem>
            );
          })}
      </UploadImgBox>
    </InputPostImageBox>
  );
};

export default InputPostImage;
