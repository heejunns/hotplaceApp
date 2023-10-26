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
  const [postData, setPostData] = useState(null);
  const [pageNationData, setPageNationData] = useState();

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
    console.log("select method", selectMethod);
    try {
      setSelectSortMethod(selectMethod);
      setIsSelectSort((prev) => !prev);
      const q = queryMake(selectMethod);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPostData(data);
      setCurrentData(data.slice(0, 8));
    } catch (e) {
      console.log(e);
    }
  };
  // 실시간으로 데이터 베이스에 저장되어 있는 데이터를 가져온다.
  const getRealTimePostData = useCallback(async () => {
    let q;
    try {
      q = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc") // createTime 기준으로 내림차순으로 정렬
      );
      onSnapshot(q, (snapshot) => {
        const data = [];
        setCurrentData([]); // 새롭게 불러온 데이터를 저장하기 위해 현재 데이터를 초기화
        snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
        setPostData(data);
        setCurrentData(data.slice(0, 8));
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onclickPageHandler = async (mode, selectMethod) => {
    try {
      let q;
      if (mode === 1) {
        q = query(
          collection(dbService, "test"),
          orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
          limit(8),
          startAfter(currentData[currentData.length - 1].createTime)
        );
      } else if (mode === 2) {
        q = query(
          collection(dbService, "test"),
          orderBy("createTime"), // createTime 기준으로 내림차순으로 정렬
          limit(8),
          startAfter(currentData[0].createTime)
        );
      }
      console.log("q", q);
      const querySnapshot = await getDocs(q);
      const postData = [];
      querySnapshot.forEach((doc) => {
        postData.push({ id: doc.id, ...doc.data() });
      });
      console.log("hello", postData);
      if (mode === 2) {
        postData.reverse();
      }
      setCurrentData(postData);
    } catch (e) {
      console.log(e);
    }
  };

  const onclickPageNumber = async (pageNumber) => {
    let q;
    console.log("왜", pageNumber);
    try {
      q = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        startAt(postData[pageNumber * 8].createTime)
      );
      onSnapshot(q, (snapshot) => {
        const postData = [];
        setCurrentData([]); // 새롭게 불러온 데이터를 저장하기 위해 현재 데이터를 초기화
        snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
        setCurrentData(postData);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const findCurrentPage = () => {
    for (let i = 0; i < Math.ceil(postData.length / 8); ++i) {
      if (postData[i * 8].createTime === currentData[0].createTime) {
        return i;
      }
    }
  };

  console.log("현재 데이터", currentData);

  console.log("시작 시간", startTime);
  console.log("끝 시간", endTime);
  console.log("뭐 데이터", postData);

  useEffect(() => {
    getRealTimePostData();
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
                onclickSelectSortChange("카페 게시글 보기");
              }}
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
        <HomeStyle.PageNationBox>
          <HomeStyle.PrevBtn
            onClick={() => onclickPageHandler(2)}
            clickDisable={
              postData &&
              currentData &&
              postData[0].createTime !== currentData[0].createTime
                ? true
                : false
            }
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </HomeStyle.PrevBtn>
          {postData &&
            new Array(Math.ceil(postData.length / 8)).fill().map((i, l) => (
              <HomeStyle.PageNumberBtn
                onClick={() => onclickPageNumber(l)}
                currentPage={findCurrentPage() === l}
              >
                {l + 1}
              </HomeStyle.PageNumberBtn>
            ))}
          <HomeStyle.NextBtn
            onClick={() => onclickPageHandler(1, selectSortMethod)}
            clickDisable={currentData.length < 8 ? false : true}
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </HomeStyle.NextBtn>
        </HomeStyle.PageNationBox>
      </HomeStyle.HomeBack>
    </>
  );
};

export default Home;
