import React from "react";
import * as TopPostStyle from "../styles/componenet/TopPostStyle";
import { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dbService } from "../reactfbase";
import { useState } from "react";
import TopPostItem from "./TopPostItem";
const TopPost = () => {
  const [topPostData, setTopPostData] = useState([]);
  const [topBoxPx, setTopBoxPx] = useState(0);
  const onclickLeftBtn = () => {
    if (topBoxPx < 2900) setTopBoxPx((prev) => prev + 1200);
  };

  const onclickRightBtn = () => {
    if (topBoxPx > -2900) setTopBoxPx((prev) => prev - 1200);
  };
  // useEffect(() => {
  //   let key = setInterval(() => {
  //     setTopBoxPx((prev) => prev - 1200);
  //   }, 1000);
  //   return () => {
  //     clearInterval(key);
  //   };
  // }, []);
  useEffect(() => {
    const getTopPost = async () => {
      try {
        const q = query(
          collection(dbService, "test"),
          orderBy("likeNumber", "desc")
        );
        const querySnapshot = await getDocs(q);
        const postData = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          postData.push({ id: doc.id, ...doc.data() });
        });
        setTopPostData(postData.slice(0, 10));
      } catch (e) {
        console.log(e);
      }
    };
    getTopPost();
  }, []);
  return (
    <>
      <TopPostStyle.TopPostTitleBox>
        <TopPostStyle.TopPostTitleText>
          인기 핫플레이스 Top10
        </TopPostStyle.TopPostTitleText>
      </TopPostStyle.TopPostTitleBox>
      <TopPostStyle.TopPostBack>
        <TopPostStyle.TopPostBox topBoxPx={topBoxPx}>
          {topPostData.length > 0 &&
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

export default TopPost;
