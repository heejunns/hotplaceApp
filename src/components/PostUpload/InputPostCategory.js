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
        <CategoryBtn
          htmlFor="popup"
          userSelectCategory={userSelectCategory === "popup" ? "black" : ""}
        >
          팝업스토어
          <span className="material-symbols-outlined">storefront</span>
          <CategoryInput
            id="popup"
            type="radio"
            name="category"
            onChange={onchangeUserSelectCategory}
          />
        </CategoryBtn>
        <CategoryBtn
          htmlFor="festival"
          userSelectCategory={userSelectCategory === "festival" ? "black" : ""}
        >
          축제 <span className="material-symbols-outlined">storefront</span>
          <CategoryInput
            id="festival"
            type="radio"
            name="category"
            onChange={onchangeUserSelectCategory}
          />
        </CategoryBtn>
        <CategoryBtn
          htmlFor="birth"
          userSelectCategory={userSelectCategory === "birth" ? "black" : ""}
        >
          생일파티 <span className="material-symbols-outlined">storefront</span>
          <CategoryInput
            id="birth"
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
