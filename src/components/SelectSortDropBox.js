import * as S from "../styles/components/SelectSortDropBox.style";
import { useRecoilState } from "recoil";
import { currentPageAtom, currentSelectSortAtom } from "../recoils/UserAtom";

const SelectSortDropBox = () => {
  const [pageCurrentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const [currentSelectSort, setCurrentSelectSort] = useRecoilState(
    currentSelectSortAtom
  );
  // 사용자가 드롭박스에서 게시글 분류 방법을 선택해 클릭하면 호출되는 콜백함수, 사용자가 클릭한 분류 방법에 해당하는 데이터를 서버에 요청해 데이터를 받아오는 함수
  const onclickSelectSortChange = (selectMethod) => {
    setCurrentSelectSort(selectMethod);
    setCurrentPage(0);
  };
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
