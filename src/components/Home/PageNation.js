import { useRecoilState } from "recoil";
import * as S from "../../styles/components/Home/PageNation.style";
import { currentPageAtom } from "../../recoils/UserAtom";

const PageNation = ({ currentData, postData }) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  return (
    <S.PageNationBox>
      <S.PrevBtn
        onClick={() => setCurrentPage((prev) => prev - 1)}
        clickDisable={
          postData &&
          currentData &&
          postData[0].createTime !== currentData[0].createTime
            ? true
            : false
        }
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </S.PrevBtn>
      {postData &&
        new Array(Math.ceil(postData.length / 8)).fill().map((i, l) => (
          <S.PageNumberBtn
            key={l}
            onClick={postData.length > 8 ? () => setCurrentPage(l) : null}
            currentPage={l === currentPage}
          >
            {l + 1}
          </S.PageNumberBtn>
        ))}
      <S.NextBtn
        onClick={() => setCurrentPage((prev) => prev + 1)}
        clickDisable={currentData.length < 8 ? false : true}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </S.NextBtn>
    </S.PageNationBox>
  );
};

export default PageNation;
