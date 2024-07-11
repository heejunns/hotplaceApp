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
          {...register("postName")}
          type="text"
          placeholder="매장 이름을 작성해주세요."
        />
      </InputPostNameBox>
    </>
  );
};

export default InputPostName;
