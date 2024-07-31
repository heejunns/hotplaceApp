import {
  InputPostDescriptionBox,
  InputTitle,
  PostDesctiptionInput,
} from "../../styles/pages/PostUpload.style";

const InputPostDescription = ({ register }) => {
  return (
    <>
      <InputPostDescriptionBox>
        <InputTitle>자세한 설명</InputTitle>
        <PostDesctiptionInput
          type="text"
          {...register("inputText", {
            required: "자세한 설명을 입력해주세요.",
            maxLength: {
              value: 100,
              message: "자세한 설명은 최대 100글자까지 입력 가능합니다.",
            },
          })}
          placeholder="자세한 설명을 작성해주세요."
        />
      </InputPostDescriptionBox>
    </>
  );
};

export default InputPostDescription;
