import {
  InputPostDescriptionBox,
  InputTitle,
  PostDesctiptionInput,
} from "../../styles/pages/PostUpload.style";

const InputPostDescription = () => {
  return (
    <>
      <InputPostDescriptionBox>
        <InputTitle>자세한 설명</InputTitle>
        <PostDesctiptionInput
          type="text"
          //   value={inputText}
          placeholder="업로드 하고 싶은 글을 작성 해주세요."
        />
      </InputPostDescriptionBox>
    </>
  );
};

export default InputPostDescription;
