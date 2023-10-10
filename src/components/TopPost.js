import React from "react";
import * as TopPostStyle from "../styles/TopPostStyle";
import { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dbService } from "../reactfbase";
import { useState } from "react";
import PostItem from "./PostItem";
const TopPost = () => {
  const [topPostData, setTopPostData] = useState([]);
  const [topBoxPx, setTopBoxPx] = useState(15);
  const onclickLeftBtn = () => {
    if (topBoxPx < 2900) setTopBoxPx((prev) => prev + 1187);
  };

  const onclickRightBtn = () => {
    if (topBoxPx > -2900) setTopBoxPx((prev) => prev - 1187);
  };
  console.log("topPostPx", topBoxPx);
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
        setTopPostData(postData);
        console.log("hi");
      } catch (e) {
        console.log(e);
      }
    };
    getTopPost();
  }, []);
  return (
    <TopPostStyle.TopPostBack>
      <TopPostStyle.TopPostBox topBoxPx={topBoxPx}>
        {topPostData.length > 0 &&
          topPostData.map((item) => {
            return <PostItem data={item} />;
          })}
      </TopPostStyle.TopPostBox>
      <TopPostStyle.TopPostPrevBtn onClick={onclickLeftBtn} topBoxPx={topBoxPx}>
        <span class="material-symbols-outlined">chevron_left</span>
      </TopPostStyle.TopPostPrevBtn>
      <TopPostStyle.TopPostNextBtn
        onClick={onclickRightBtn}
        topBoxPx={topBoxPx}
      >
        <span class="material-symbols-outlined">chevron_right</span>
      </TopPostStyle.TopPostNextBtn>
    </TopPostStyle.TopPostBack>
  );
};

export default TopPost;
