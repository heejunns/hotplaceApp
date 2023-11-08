import React, { useCallback, useEffect, useRef, useState } from "react";
import { dbService } from "../reactfbase";
import {
  collection,
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

// ============================================ Home(메인) 페이지 ===================================
// 사용자들이 게시한 게시물들을 한번에 볼 수 있고 사용자들이 좋아요를 눌러 좋아요를 가장 많이 받은 순서대로 1~10위까지 한번에 볼 수 있는 페이지 입니다.
// 게시글들도 사용자가 드롭박스에서 분류 방법을 선택하여 원하는 분류 방식의 게시글들을 볼 수 있습니다.
// ===============================================================================================
const Home = ({ userLocation }) => {
  // 현재 화면에 보여지는 게시글의 데이터를 담고 있는 state
  const [currentData, setCurrentData] = useState([]);
  // 게시글 분류 방법을 담고 있는 state
  const [selectSortMethod, setSelectSortMethod] = useState("전체 게시글 보기");
  // 드롭박스를 펼칠지에대한 여부 state
  const [isSelectSort, setIsSelectSort] = useState(false);
  // 현재 분류 방법에 대한 전체 게시글 데이터를 담는 state
  const [postData, setPostData] = useState(null);
  // 드롭박스 버튼 돔에 접근하기 위한 ref 객체 생성
  const selectSortMethodBtnRef = useRef();
  // 드롭박스를 클릭 후 펼쳐지는 분류방법 리스트 돔에 접근하기 위한 ref 객체 생성
  const selectSortMethodListRef = useRef();

  // 드롭박스 버튼을 클릭하여 드롭박스가 펼쳐져 있는 상태에서 다른 외부 화면을 클릭하고 있다면 드롭박스가 닫히는 코드
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

  // 사용자가 선택한 분류 방법에 따라 서버에 요청할 쿼리를 만드는 함수
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
  // 사용자가 드롭박스에서 게시글 분류 방법을 선택해 클릭하면 호출되는 콜백함수, 사용자가 클릭한 분류 방법에 해당하는 데이터를 서버에 요청해 데이터를 받아오는 함수
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
  // 화면에 Home 컴포넌트가 마운트 하면 호출되는 함수, 화면에 처음으로 보여지는 전체 게시글 데이터를 서버에 요청해서 받아오는 함수
  const getFirstPostData = useCallback(async () => {
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

  // 왼쪽, 오른쪽 화살표를 클릭하면 호출되는 콜백함수, 화살표를 클릭했을때 해당하는 데이터를 서버에 요청해 받아오는 함수
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
  // 페이지네이션에서 숫자를 클릭하면 호출되는 콜백함수, 클릭한 숫자에 해당하는 데이터를 서버에 요청해 받아오는 함수
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
  // 사용자에게 현재 페이지가 몇번째 페이지인지 보여주기 위해서 현재 화면에 보여질 데이터를 가지고 전체 데이터와 비교하여 현재 페이지가 몇번째 페이지인지 찾는 함수
  const findCurrentPage = () => {
    for (let i = 0; i < Math.ceil(postData.length / 8); ++i) {
      if (postData[i * 8].createTime === currentData[0].createTime) {
        return i;
      }
    }
  };

  useEffect(() => {
    getFirstPostData();
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
              <span className="material-symbols-outlined">expand_less</span>
            ) : (
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
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
            <span className="material-symbols-outlined">chevron_left</span>
          </HomeStyle.PrevBtn>
          {postData &&
            new Array(Math.ceil(postData.length / 8)).fill().map((i, l) => (
              <HomeStyle.PageNumberBtn
                key={l}
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
            <span className="material-symbols-outlined">chevron_right</span>
          </HomeStyle.NextBtn>
        </HomeStyle.PageNationBox>
      </HomeStyle.HomeBack>
    </>
  );
};

export default Home;
