import { collection, orderBy, query, where } from "firebase/firestore";
import * as PageNationStyle from "../styles/componenet/PageNationStyle";
import { dbService } from "../reactfbase";

const PageNation = ({
  onclickPageNumber,
  onclickPageHandler,
  currentData,
  currentPage,
  postData,
}) => {
  return (
    <PageNationStyle.PageNationBox>
      <PageNationStyle.PrevBtn
        onClick={() => onclickPageHandler(1)}
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
            onClick={postData.length > 8 ? () => onclickPageNumber(l) : null}
            currentPage={l === currentPage}
          >
            {l + 1}
          </PageNationStyle.PageNumberBtn>
        ))}
      <PageNationStyle.NextBtn
        onClick={() => onclickPageHandler(2)}
        clickDisable={currentData.length < 8 ? false : true}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </PageNationStyle.NextBtn>
    </PageNationStyle.PageNationBox>
  );
};

export default PageNation;
