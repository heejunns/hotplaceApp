import * as PageNationStyle from "../styles/componenet/PageNationStyle";

const PageNation = ({ currentData, currentPage, postData, setCurrentPage }) => {
  return (
    <PageNationStyle.PageNationBox>
      <PageNationStyle.PrevBtn
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
      </PageNationStyle.PrevBtn>
      {postData &&
        new Array(Math.ceil(postData.length / 8)).fill().map((i, l) => (
          <PageNationStyle.PageNumberBtn
            key={l}
            onClick={postData.length > 8 ? () => setCurrentPage(l) : null}
            currentPage={l === currentPage}
          >
            {l + 1}
          </PageNationStyle.PageNumberBtn>
        ))}
      <PageNationStyle.NextBtn
        onClick={() => setCurrentPage((prev) => prev + 1)}
        clickDisable={currentData.length < 8 ? false : true}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </PageNationStyle.NextBtn>
    </PageNationStyle.PageNationBox>
  );
};

export default PageNation;
