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
import * as HomeStyle from "../styles/pages/HomeStyle";
import PostItem from "../components/PostItem";
import TopPost from "../components/TopPost";

const Home = ({ userLocation }) => {
  const [currentData, setCurrentData] = useState([]);
  const [selectSortMethod, setSelectSortMethod] = useState("전체 게시글 보기");
  const [isSelectSort, setIsSelectSort] = useState(false);
  const selectSortMethodBtnRef = useRef();
  const selectSortMethodListRef = useRef();
  const [postData, setPostData] = useState(null);

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
    try {
      const q = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc") // createTime 기준으로 내림차순으로 정렬
      );

      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setPostData(data);
      setCurrentData(data.slice(0, 8));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onclickPageHandler = async (mode) => {
    try {
      let q = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        mode === 1
          ? endBefore(currentData[0].createTime)
          : startAfter(currentData[currentData.length - 1].createTime)
      );
      const querySnapshot = await getDocs(q);
      const postData = [];
      querySnapshot.forEach((doc) => {
        postData.push({ id: doc.id, ...doc.data() });
      });
      setCurrentData(postData);
    } catch (e) {
      console.log(e);
    }
  };

  const onclickPageNumber = async (pageNumber) => {
    try {
      let q = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        startAt(postData[pageNumber * 8].createTime)
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setCurrentData(data);
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

  useEffect(() => {
    getRealTimePostData();
  }, []);

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
            onClick={() => onclickPageHandler(1)}
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
            onClick={() => onclickPageHandler(2)}
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
