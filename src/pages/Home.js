import React, { useCallback, useEffect, useRef, useState } from "react";
import { dbService } from "../reactfbase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
  startAt,
  limit,
  startAfter,
  endBefore,
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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const selectSortMethodBtnRef = useRef();
  const selectSortMethodListRef = useRef();
  // const [selectMethodText, setSelectMethodText] = useState("전체 게시글 보기");

  useEffect(() => {
    const outSideClick = (e) => {
      const { target } = e;
      if (
        isSelectSort &&
        selectSortMethodBtnRef.current &&
        selectSortMethodListRef &&
        !selectSortMethodBtnRef.current.contains(target) &&
        !selectSortMethodListRef.current.contains(target)
      ) {
        setIsSelectSort(false);
      }
    };
    document.addEventListener("mousedown", outSideClick);
  }, [isSelectSort]);

  const onclickSelectSortMethod = () => {
    setIsSelectSort((prev) => !prev);
  };
  const queryMake = (number, selectMethod) => {
    let queryContent;
    if (
      currentData.length === 0 &&
      number === 0 &&
      selectMethod === "전체 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"),
        limit(4)
      );
    } else if (
      currentData.length === 0 &&
      number === 0 &&
      selectMethod === "카페 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "카페"),
        orderBy("createTime", "desc"),
        limit(4)
      );
    } else if (
      currentData.length === 0 &&
      number === 0 &&
      selectMethod === "음식 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "음식"),
        orderBy("createTime", "desc"),
        limit(4)
      );
    } else if (
      currentData.length === 0 &&
      number === 0 &&
      selectMethod === "마트 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "마트"),
        orderBy("createTime", "desc"),
        limit(4)
      );
    } else if (
      currentData.length === 0 &&
      number === 0 &&
      selectMethod === "좋아요 순으로 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc"),
        limit(4)
      );
    } else if (
      currentData.length === 0 &&
      number === 0 &&
      selectMethod === "나의 지역 게시글만 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("userLocation", "==", userLocation),
        orderBy("createTime", "desc"),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 1 &&
      selectMethod === "전체 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"),
        startAfter(currentData[currentData.length - 1].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 1 &&
      selectMethod === "카페 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "카페"),
        orderBy("createTime", "desc"),
        startAfter(currentData[currentData.length - 1].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 1 &&
      selectMethod === "음식 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "음식"),
        orderBy("createTime", "desc"),
        startAfter(currentData[currentData.length - 1].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 1 &&
      selectMethod === "마트 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "마트"),
        orderBy("createTime", "desc"),
        startAfter(currentData[currentData.length - 1].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 1 &&
      selectMethod === "좋아요 순으로 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc"),
        startAfter(currentData[currentData.length - 1].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 2 &&
      selectMethod === "나의 지역 게시글만 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("userLocation", "==", userLocation),
        orderBy("createTime", "desc"),
        startAfter(currentData[0].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 2 &&
      selectMethod === "전체 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"),
        startAfter(currentData[0].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 2 &&
      selectMethod === "카페 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "카페"),
        orderBy("createTime", "desc"),
        startAfter(currentData[0].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 2 &&
      selectMethod === "음식 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "음식"),
        orderBy("createTime", "desc"),
        startAfter(currentData[0].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 2 &&
      selectMethod === "마트 게시글 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "마트"),
        orderBy("createTime", "desc"),
        startAfter(currentData[0].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 2 &&
      selectMethod === "좋아요 순으로 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc"),
        startAfter(currentData[0].createTime),
        limit(4)
      );
    } else if (
      currentData.length > 0 &&
      number === 2 &&
      selectMethod === "나의 지역 게시글만 보기"
    ) {
      queryContent = query(
        collection(dbService, "test"),
        where("userLocation", "==", userLocation),
        orderBy("createTime", "desc"),
        startAfter(currentData[0].createTime),
        limit(4)
      );
    }
    return queryContent;
  };
  const onclickSelectSortChange = async (number, selectMethod) => {
    console.log("select method", selectMethod);
    try {
      setSelectSortMethod(selectMethod);
      setIsSelectSort((prev) => !prev);
      const q = queryMake(number, selectMethod);
      const querySnapshot = await getDocs(q);
      const postData = [];
      if (number === 0 && number === 1) {
        querySnapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });
      } else if (number === 2) {
        querySnapshot.forEach((doc) => {
          postData.push({ ...doc.data(), id: doc.id });
        });
      }
      setCurrentData(postData);
    } catch (e) {
      console.log(e);
    }
  };
  // 실시간으로 데이터 베이스에 저장되어 있는 데이터를 가져온다.
  const getRealTimePostData = useCallback(
    async (number) => {
      let q;
      // setStartTime(currentData.length > 0 && currentData[0].createTime);
      try {
        if (currentData.length === 0 && number === 0) {
          q = query(
            collection(dbService, "test"),
            orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
            limit(4)
          );
        } else if (currentData.length > 0 && number === 1) {
          console.log("응?");
          q = query(
            collection(dbService, "test"),
            orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
            startAfter(currentData[currentData.length - 1].createTime),
            limit(4)
          );
        } else if (currentData.length > 0 && number === 2) {
          q = query(
            collection(dbService, "test"),
            orderBy("createTime"), // createTime 기준으로 내림차순으로 정렬
            startAfter(currentData[0].createTime),
            limit(4)
          );
        }
        if (number === 0 || number === 1) {
          onSnapshot(q, (snapshot) => {
            setCurrentData([]); // 새롭게 불러온 데이터를 저장하기 위해 현재 데이터를 초기화
            snapshot.forEach((doc) =>
              setCurrentData((prevDocData) => [
                ...prevDocData,
                { ...doc.data(), id: doc.id },
              ])
            );
          });
        } else if (number === 2) {
          onSnapshot(q, (snapshot) => {
            setCurrentData([]); // 새롭게 불러온 데이터를 저장하기 위해 현재 데이터를 초기화
            snapshot.forEach((doc) =>
              setCurrentData((prevDocData) => [
                { ...doc.data(), id: doc.id },
                ...prevDocData,
              ])
            );
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    [currentData]
  );

  console.log("현재 데이터", currentData);

  console.log("시작 시간", startTime);
  console.log("끝 시간", endTime);

  useEffect(() => {
    getRealTimePostData(0);
  }, []);

  console.log("select", selectSortMethod);

  return (
    <>
      <HomeStyle.HomeBack>
        <TopPost />
        <HomeStyle.SelectSortMethodBox>
          <HomeStyle.SelectSortMethodBtn
            onClick={() => setIsSelectSort((prev) => !prev)}
            ref={selectSortMethodBtnRef}
          >
            {selectSortMethod}
            {isSelectSort ? (
              <span class="material-symbols-outlined">expand_less</span>
            ) : (
              <span class="material-symbols-outlined">keyboard_arrow_down</span>
            )}
          </HomeStyle.SelectSortMethodBtn>
          <HomeStyle.SelectSortMethodList
            isSelectSort={isSelectSort}
            ref={selectSortMethodListRef}
          >
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange("전체 게시글 보기")}
            >
              전체 게시글 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() => {
                console.log("카페 게시글 보기");
                onclickSelectSortChange(0, "카페 게시글 보기");
              }}
            >
              카페 게시글 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange(0, "음식 게시글 보기")}
            >
              음식 게시글 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange(0, "마트 게시글 보기")}
            >
              마트 게시글 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() => onclickSelectSortChange(0, "좋아요 순으로 보기")}
            >
              좋아요 순으로 보기
            </HomeStyle.SelectSortMethodItem>
            <HomeStyle.SelectSortMethodItem
              onClick={() =>
                onclickSelectSortChange(0, "나의 지역 게시글만 보기")
              }
            >
              나의 지역 게시글만 보기
            </HomeStyle.SelectSortMethodItem>
          </HomeStyle.SelectSortMethodList>
        </HomeStyle.SelectSortMethodBox>
        {currentData.length < 4 ? null : (
          <button onClick={() => onclickSelectSortChange(1, selectSortMethod)}>
            오른쪽으로
          </button>
        )}
        <button onClick={() => onclickSelectSortChange(2, selectSortMethod)}>
          왼쪽으로
        </button>

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
