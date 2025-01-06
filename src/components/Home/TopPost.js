import * as TopPostStyle from "../../styles/components/Home/TopPost.style";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dbService } from "../../reactfbase";
import { memo, useEffect, useState } from "react";
import TopPostItem from "./TopPostItem";
import { useQuery } from "@tanstack/react-query";
import { TopPostSkeleton } from "../../styles/components/Home/TopPostItem.style";
const topPostDummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const TopPost = ({ title }) => {
  const [topPostData, setTopPostData] = useState([]);
  const [topPostDataLoading, setTopPostDataLoading] = useState(false);
  const [topBoxPx, setTopBoxPx] = useState(0);
  const onclickLeftBtn = () => {
    if (topBoxPx < 0) setTopBoxPx((prev) => prev + 1080);
  };

  const onclickRightBtn = () => {
    if (topBoxPx > -3240) setTopBoxPx((prev) => prev - 1080);
  };

  const getTopPost = async () => {
    try {
      setTopPostDataLoading(true);
      const q = query(
        collection(dbService, "test"),
        where(
          "category",
          "==",
          title === "cafe" ? "카페" : title === "food" ? "음식" : null
        ),
        orderBy("likeNumber", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setTopPostDataLoading(false);
      setTopPostData(data.slice(0, 12));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTopPost();
  }, []);
  // const { data: topPostData } = useQuery({
  //   queryKey: ["topData"],
  //   queryFn: getTopPost,
  // });
  console.log("hello", topPostData);
  return (
    <>
      <TopPostStyle.TopPostTitleBox>
        <TopPostStyle.TopPostTitleText>
          {`인기 ${
            title === "cafe" ? "카페" : title === "food" ? "맛집" : ""
          } Top12`}
        </TopPostStyle.TopPostTitleText>
      </TopPostStyle.TopPostTitleBox>
      <TopPostStyle.TopPostOutContainer>
        <TopPostStyle.TopPostPrevBtn
          onClick={onclickLeftBtn}
          topBoxPx={topBoxPx}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </TopPostStyle.TopPostPrevBtn>
        <TopPostStyle.TopPostInnerContainer>
          <TopPostStyle.TopPostBox topBoxPx={topBoxPx}>
            {topPostDataLoading
              ? topPostDummyData.map((item) => <TopPostSkeleton />)
              : topPostData.length > 0 &&
                topPostData.map((item, index) => {
                  return (
                    <TopPostItem key={index} data={item} ranking={index + 1} />
                  );
                })}
          </TopPostStyle.TopPostBox>
        </TopPostStyle.TopPostInnerContainer>
        <TopPostStyle.TopPostNextBtn
          onClick={onclickRightBtn}
          topBoxPx={topBoxPx}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </TopPostStyle.TopPostNextBtn>
      </TopPostStyle.TopPostOutContainer>
    </>
  );
};

export default memo(TopPost);
