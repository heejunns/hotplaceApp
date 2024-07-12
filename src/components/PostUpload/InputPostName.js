import {
  InputPostNameBox,
  InputTitle,
  NameInput,
} from "../../styles/pages/PostUpload.style";

const InputPostName = ({ register }) => {
  return (
    <>
      <InputPostNameBox>
        <InputTitle>매장 이름</InputTitle>
        <NameInput
          {...register("postName", {
            required: "매장 이름을 작성해주세요.",
            maxLength: {
              value: 10,
              message: "매장 이름은 최대 10글자 입니다.",
            },
          })}
          type="text"
          placeholder="매장 이름을 작성해주세요."
        />
      </InputPostNameBox>
    </>
  );
};

export default InputPostName;
