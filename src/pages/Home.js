import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
import SelectSortDropBox from "../components/SelectSortDropBox";
import PageNation from "../components/PageNation";
import { useParams } from "react-router-dom";

// ============================================ Home(메인) 페이지 ===================================
// 사용자들이 게시한 게시물들을 한번에 볼 수 있고 사용자들이 좋아요를 눌러 좋아요를 가장 많이 받은 순서대로 1~10위까지 한번에 볼 수 있는 페이지 입니다.
// 게시글들도 사용자가 드롭박스에서 분류 방법을 선택하여 원하는 분류 방식의 게시글들을 볼 수 있습니다.
// ===============================================================================================
const Home = ({ userLocation }) => {
  const { id } = useParams();
  // 현재 화면에 보여지는 게시글의 데이터를 담고 있는 state
  const [currentData, setCurrentData] = useState([]);

  // 현재 페이지를 기억하는 state
  const [currentPage, setCurrentPage] = useState(0);

  // 현재 분류 방법에 대한 전체 게시글 데이터를 담는 state
  const [postData, setPostData] = useState(null);

  // 게시글 분류 방법을 담고 있는 state
  const [selectSortMethod, setSelectSortMethod] =
    useState("최신글 순으로 보기");

  console.log(postData);
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

  const queryMakePageHandler = (selectSortMethod, mode) => {
    let queryContent;
    if (selectSortMethod === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        mode === 1
          ? startAt(postData[(currentPage - 1) * 8].createTime)
          : startAt(postData[(currentPage + 1) * 8].createTime)
      );
    } else if (selectSortMethod === "예전글 순으로 보기") {
      queryContent = queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        mode === 1
          ? startAt(postData[(currentPage - 1) * 8].createTime)
          : startAt(postData[(currentPage + 1) * 8].createTime)
      );
    } else if (selectSortMethod === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc"),
        limit(8),
        mode === 1
          ? startAt(postData[(currentPage - 1) * 8].likeNumber)
          : startAt(postData[(currentPage + 1) * 8].likeNumber)
      );
    } else if (selectSortMethod === "나의 지역 게시글만 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        mode === 1
          ? startAt(postData[(currentPage - 1) * 8].createTime)
          : startAt(postData[(currentPage + 1) * 8].createTime)
      );
    }
    return queryContent;
  };
  // 왼쪽, 오른쪽 화살표를 클릭하면 호출되는 콜백함수, 화살표를 클릭했을때 해당하는 데이터를 서버에 요청해 받아오는 함수
  const onclickPageHandler = async (mode) => {
    try {
      let q = queryMakePageHandler(selectSortMethod, mode);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setCurrentPage((prev) => (mode === 1 ? prev - 1 : prev + 1));
      setCurrentData(data);
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
      setCurrentPage(pageNumber);
      setCurrentData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getFirstPostData();
  }, []);

  return (
    <>
      <HomeStyle.HomeBack>
        <TopPost />
        <SelectSortDropBox
          setCurrentData={setCurrentData}
          setPostData={setPostData}
          selectSortMethod={selectSortMethod}
          setSelectSortMethod={setSelectSortMethod}
          userLocation={userLocation}
          pageId={id}
        />
        {currentData.length === 0 ? (
          <HomeStyle.EmptyPost>현재 게시물이 없습니다.</HomeStyle.EmptyPost>
        ) : (
          <HomeStyle.PostLayout>
            {currentData.map((data, index) => {
              return <PostItem key={index} data={data} />;
            })}
          </HomeStyle.PostLayout>
        )}
        {postData && currentData && (
          <PageNation
            onclickPageHandler={onclickPageHandler}
            onclickPageNumber={onclickPageNumber}
            currentData={currentData}
            currentPage={currentPage}
            postData={postData}
          />
        )}
      </HomeStyle.HomeBack>
    </>
  );
};

export default Home;
