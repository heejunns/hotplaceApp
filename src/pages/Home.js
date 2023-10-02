import React, { useCallback, useEffect, useState } from "react";
import { dbService } from "../reactfbase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { hamburgerBtnClick } from "../recoils/UserAtom";
import * as HomeStyle from "../styles/HomeStyle";
import PostItem from "../components/PostItem";
import DeleteModal from "../components/DeleteModal";

const Home = ({ userLocation }) => {
  const [currentData, setCurrentData] = useState([]);
  const hamburgerClickInfo = useRecoilValue(hamburgerBtnClick);

  useEffect(() => {
    console.log("랜더링");
  }, [hamburgerClickInfo]);
  // 실시간으로 데이터 베이스에 저장되어 있는 데이터를 가져온다.
  const getRealTimePostData = useCallback(() => {
    const q = query(
      collection(dbService, "test"),
      orderBy("createTime", "desc") // createTime 기준으로 내림차순으로 정렬
    );
    onSnapshot(q, (snapshot) => {
      setCurrentData([]); // 새롭게 불러온 데이터를 저장하기 위해 현재 데이터를 초기화
      snapshot.forEach((doc) =>
        setCurrentData((prevDocData) => [
          ...prevDocData,
          { ...doc.data(), id: doc.id },
        ])
      );
    });
  }, []);

  useEffect(() => {
    getRealTimePostData();
  }, [getRealTimePostData]);
  // 카페, 음식, 마트 게시물 보기 클릭하였을 때
  const onclickPost = useCallback((category) => {
    const q = query(
      collection(dbService, "test"),
      where("userSelectCategory", "==", category),
      orderBy("createTime", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setCurrentData([]);
      snapshot.forEach((doc) =>
        setCurrentData((prevDocData) => [
          ...prevDocData,
          { ...doc.data(), id: doc.id },
        ])
      );
    });
  }, []);
  // 좋아요 순 게시글 보기 클릭하였을 때
  const onclickPostLike = useCallback(() => {
    const q = query(
      collection(dbService, "test"),
      orderBy("likeNumber", "desc")
    );
    console.log(q);
    onSnapshot(q, (snapshot) => {
      setCurrentData([]);
      snapshot.forEach((doc) =>
        setCurrentData((prevDocData) => [
          ...prevDocData,
          { ...doc.data(), id: doc.id },
        ])
      );
    });
  }, []);
  // 사용자의 사는 지역 게시글만 보기 클릭하였을 때
  const onclickPostAddress = useCallback(() => {
    const q = query(
      collection(dbService, "test"),
      where("userLocation", "==", userLocation),
      orderBy("createTime", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setCurrentData([]);
      snapshot.forEach((doc) =>
        setCurrentData((prevDocData) => [
          ...prevDocData,
          { ...doc.data(), id: doc.id },
        ])
      );
    });
  }, [userLocation]);

  return (
    <>
      <HomeStyle.HomeBack hamburgerClickInfo={hamburgerClickInfo}>
        <HomeStyle.PostLayout>
          {currentData.length === 0 ? (
            <HomeStyle.EmptyPost>현재 게시물이 없습니다.</HomeStyle.EmptyPost>
          ) : (
            currentData.map((data, index) => {
              return (
                <PostItem
                  key={index}
                  data={data}
                  index={index}
                  dataLen={currentData.length}
                />
              );
            })
          )}
        </HomeStyle.PostLayout>
      </HomeStyle.HomeBack>
    </>
  );
};

export default Home;
