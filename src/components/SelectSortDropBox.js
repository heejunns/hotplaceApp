import * as S from "../styles/components/SelectSortDropBox.style";
import { useRecoilState } from "recoil";
import { currentPageAtom, currentSelectSortAtom } from "../recoils/UserAtom";

const SelectSortDropBox = ({ onclickSelectSortChange }) => {
  // const [pageCurrentPage, setCurrentPage] = useRecoilState(currentPageAtom);ㄴ
  const [currentSelectSort, setCurrentSelectSort] = useRecoilState(
    currentSelectSortAtom
  );
  return (
    <S.SelectSortMethodBox>
      <S.SelectSortMethodBtn>
        {currentSelectSort}
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </S.SelectSortMethodBtn>
      <S.SelectSortMethodList>
        <S.SelectSortMethodItem
          onClick={() => onclickSelectSortChange("최신글 순으로 보기")}
        >
          최신글 순으로 보기
        </S.SelectSortMethodItem>
        <S.SelectSortMethodItem
          onClick={() => {
            onclickSelectSortChange("예전글 순으로 보기");
          }}
        >
          예전글 순으로 보기
        </S.SelectSortMethodItem>
        <S.SelectSortMethodItem
          onClick={() => onclickSelectSortChange("좋아요 순으로 보기")}
        >
          좋아요 순으로 보기
        </S.SelectSortMethodItem>
        <S.SelectSortMethodItem
          onClick={() => onclickSelectSortChange("나의 지역 글만 보기")}
        >
          나의 지역 글만 보기
        </S.SelectSortMethodItem>
      </S.SelectSortMethodList>
    </S.SelectSortMethodBox>
  );
};

export default SelectSortDropBox;
