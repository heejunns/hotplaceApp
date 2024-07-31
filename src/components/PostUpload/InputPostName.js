import {
  InputPostNameBox,
  InputTitle,
  NameInput,
} from "../../styles/pages/PostUpload.style";

const InputPostName = ({ register }) => {
  return (
    <>
      <InputPostNameBox>
        <InputTitle>제목</InputTitle>
        <NameInput
          {...register("postName", {
            required: "제목을 작성해주세요.",
            maxLength: {
              value: 10,
              message: "제목 최대 10글자 입니다.",
            },
          })}
          type="text"
          placeholder="제목을 작성해주세요."
        />
      </InputPostNameBox>
    </>
  );
};

export default InputPostName;
