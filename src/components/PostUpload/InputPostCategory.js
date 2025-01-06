import {
  CategoryBtn,
  CategoryInput,
  CategoryMenuBox,
  InputPostCategoryBox,
  InputTitle,
} from "../../styles/pages/PostUpload.style";

const InputPostCategory = ({
  userSelectCategory,
  onchangeUserSelectCategory,
}) => {
  return (
    <InputPostCategoryBox>
      <InputTitle>카테고리 선택</InputTitle>
      <CategoryMenuBox>
        <CategoryBtn
          htmlFor="cafe"
          userSelectCategory={userSelectCategory === "cafe" ? "black" : ""}
        >
          카페 <span className="material-symbols-outlined">local_cafe</span>
          <CategoryInput
            id="cafe"
            type="radio"
            name="category"
            onChange={onchangeUserSelectCategory}
          />
        </CategoryBtn>
        <CategoryBtn
          htmlFor="food"
          userSelectCategory={userSelectCategory === "food" ? "black" : ""}
        >
          맛집 <span className="material-symbols-outlined">restaurant</span>
          <CategoryInput
            id="food"
            type="radio"
            name="category"
            onChange={onchangeUserSelectCategory}
          />
        </CategoryBtn>
      </CategoryMenuBox>
    </InputPostCategoryBox>
  );
};

export default InputPostCategory;
