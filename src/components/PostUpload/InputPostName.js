import {
  InputPostNameBox,
  InputTitle,
  NameInput,
} from "../../styles/pages/PostUpload.style";

const InputPostName = () => {
  return (
    <>
      <InputPostNameBox>
        <InputTitle>매장 이름</InputTitle>
        <NameInput type="text" placeholder="매장 이름을 작성해주세요." />
      </InputPostNameBox>
    </>
  );
};

export default InputPostName;
