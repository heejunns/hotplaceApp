import * as TopPostStyle from "../styles/componenet/TopPostStyle";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "../reactfbase";
import { memo, useState } from "react";
import TopPostItem from "./TopPostItem";
import { useQuery } from "react-query";
const TopPost = () => {
  const [topBoxPx, setTopBoxPx] = useState(0);
  const onclickLeftBtn = () => {
    if (topBoxPx < 2900) setTopBoxPx((prev) => prev + 1200);
  };

  const onclickRightBtn = () => {
    if (topBoxPx > -2900) setTopBoxPx((prev) => prev - 1200);
  };

  const getTopPost = async () => {
    try {
      const q = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data.slice(0, 10);
    } catch (e) {
      console.log(e);
    }
  };

  const { data: topPostData } = useQuery("topData", getTopPost);
  console.log("hello", topPostData);
  return (
    <>
      <TopPostStyle.TopPostTitleBox>
        <TopPostStyle.TopPostTitleText>
          인기 핫플레이스 Top10
        </TopPostStyle.TopPostTitleText>
      </TopPostStyle.TopPostTitleBox>
      <TopPostStyle.TopPostBack>
        <TopPostStyle.TopPostBox topBoxPx={topBoxPx}>
          {topPostData &&
            topPostData.length > 0 &&
            topPostData.map((item, index) => {
              return (
                <TopPostItem key={index} data={item} ranking={index + 1} />
              );
            })}
        </TopPostStyle.TopPostBox>
        <TopPostStyle.TopPostPrevBtn
          onClick={onclickLeftBtn}
          topBoxPx={topBoxPx}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </TopPostStyle.TopPostPrevBtn>
        <TopPostStyle.TopPostNextBtn
          onClick={onclickRightBtn}
          topBoxPx={topBoxPx}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </TopPostStyle.TopPostNextBtn>
      </TopPostStyle.TopPostBack>
    </>
  );
};

export default memo(TopPost);
