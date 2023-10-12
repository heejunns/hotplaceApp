import React, { useCallback, useEffect, useState } from "react";
import { dbService } from "../reactfbase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { hamburgerBtnClick } from "../recoils/UserAtom";
import * as HomeStyle from "../styles/pages/HomeStyle";
import PostItem from "../components/PostItem";
import DeleteModal from "../components/PostDeleteModal";
import TopPost from "../components/TopPost";
import NoUserClickModal from "../components/NoUserClickModal";

const Home = ({ userLocation }) => {
  const [currentData, setCurrentData] = useState([]);
  const [selectSortMethod, setSelectSortMethod] = useState("전체 게시글 보기");
  const [isSelectSort, setIsSelectSort] = useState(false);

  const onclickSelectSortMethod = () => {
    setIsSelectSort((prev) => !prev);
  };
  const queryMake = (selectMethod) => {
    let queryContent;
    if (selectMethod === "전체 게시글 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc")
      );
    } else if (selectMethod === "카페 게시글 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "카페"),
        orderBy("createTime", "desc")
      );
    } else if (selectMethod === "음식 게시글 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "음식"),
        orderBy("createTime", "desc")
      );
    } else if (selectMethod === "마트 게시글 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "마트"),
        orderBy("createTime", "desc")
      );
    } else if (selectMethod === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc")
      );
    } else if (selectMethod === "나의 지역 게시글만 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("userLocation", "==", userLocation),
        orderBy("createTime", "desc")
      );
    }
    return queryContent;
  };
  const onclickSelectSortChange = async (selectMethod) => {
    try {
      setSelectSortMethod(selectMethod);
      setIsSelectSort((prev) => !prev);
      console.log("h");
      const q = queryMake(selectMethod);
      console.log("q", q);
      const querySnapshot = await getDocs(q);
      const postData = [];
      querySnapshot.forEach((doc) => {
        console.log("데이터", doc.data());
        postData.push({ id: doc.id, ...doc.data() });
      });
      setCurrentData(postData);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, doc.data());
      // });
    } catch (e) {
      console.log(e);
    }
  };
  // 실시간으로 데이터 베이스에 저장되어 있는 데이터를 가져온다.
  const getRealTimePostData = useCallback(() => {
    const q = query(
      collection(dbService, "test"),
      orderBy("createTime", "desc") // createTime 기준으로 내림차순으로 정렬
    );
    console.log("hello snapshot");
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
      <HomeStyle.HomeBack>
        <TopPost />
        <HomeStyle.SelectSortMethodBox>
          <HomeStyle.SelectSortMethodBtn onClick={onclickSelectSortMethod}>
            {selectSortMethod}
            {isSelectSort ? (
              <span class="material-symbols-outlined">expand_less</span>
            ) : (
              <span class="material-symbols-outlined">keyboard_arrow_down</span>
            )}
          </HomeStyle.SelectSortMethodBtn>
          <HomeStyle.SelectSortMethodList isSelectSort={isSelectSort}>
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange("전체 게시글 보기")}
            >
              전체 게시글 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange("카페 게시글 보기")}
            >
              카페 게시글 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange("음식 게시글 보기")}
            >
              음식 게시글 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange("마트 게시글 보기")}
            >
              마트 게시글 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange("좋아요 순으로 보기")}
            >
              좋아요 순으로 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange("나의 지역 게시글만 보기")}
            >
              나의 지역 게시글만 보기
            </HomeStyle.SelectSortMethodItem>
          </HomeStyle.SelectSortMethodList>
        </HomeStyle.SelectSortMethodBox>

        {currentData.length === 0 ? (
          <HomeStyle.EmptyPost>현재 게시물이 없습니다.</HomeStyle.EmptyPost>
        ) : (
          <HomeStyle.PostLayout>
            {currentData.map((data, index) => {
              return (
                <PostItem
                  key={index}
                  data={data}
                  index={index}
                  dataLen={currentData.length}
                />
              );
            })}
          </HomeStyle.PostLayout>
        )}
      </HomeStyle.HomeBack>
    </>
  );
};

export default Home;
