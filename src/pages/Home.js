import { dbService } from "../reactfbase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  startAt,
  limit,
  where,
  endAt,
} from "firebase/firestore";
import * as S from "../styles/pages/Home.style";
import PostItem from "../components/Home/PostItem";
import TopPost from "../components/Home/TopPost";
import SelectSortDropBox from "../components/SelectSortDropBox";
import PageNation from "../components/Home/PageNation";
import HomeSlide from "../components/Home/HomeSlide";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentPageAtom,
  currentSelectSortAtom,
  firebaseInitialize,
  userLocation,
} from "../recoils/UserAtom";
import { Loading } from "../styles/components/Loading.style";
import { FadeLoader, PulseLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useEffect, useMemo, useRef, useState } from "react";
import { debounce, throttle } from "lodash";
import InputPostDate from "../components/PostUpload/InputPostDate";
// ============================================ Home(메인) 페이지 ===================================
// 사용자들이 게시한 게시물들을 한번에 볼 수 있고 사용자들이 좋아요를 눌러 좋아요를 가장 많이 받은 순서대로 1~10위까지 한번에 볼 수 있는 페이지 입니다.
// 게시글들도 사용자가 드롭박스에서 분류 방법을 선택하여 원하는 분류 방식의 게시글들을 볼 수 있습니다.
// ===============================================================================================
const homeDummyData = [1, 2, 3, 4];
const Home = () => {
  const [postData, setPostData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [homeDataLoading, setHomeDataLoading] = useState(false);
  const [dataAddLoading, setDataAddLoading] = useState(false);
  const firebaseInitial = useRecoilValue(firebaseInitialize);
  const location = useRecoilValue(userLocation);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  // 게시글 분류 방법을 담고 있는 state
  const [currentSelectSort, setCurrentSelectSort] = useRecoilState(
    currentSelectSortAtom
  );
  const [noFunc, setNoFunc] = useState(false);
  const [start, setStart] = useState();
  // 전체 데이터를 불러오는 로직
  // 현재 사용자가 선택한 분류 방법에 의해 전체 데이터를 서버에 요청할 쿼리를 생성할 함수
  const postDataQueryMake = (currentSelectSort) => {
    let queryContent;

    if (currentSelectSort === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc")
      );
    } else if (currentSelectSort === "예전글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime")
      );
    } else if (currentSelectSort === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc")
      );
    } else if (currentSelectSort === "나의 지역 글만 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("userLocation", "==", location),
        orderBy("createTime", "desc")
      );
    }

    return queryContent;
  };
  const getPostData = async (currentSelectSort) => {
    console.log("호출");
    try {
      const q = postDataQueryMake(currentSelectSort);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log("data", data);
      setStart(data[0].createTime);
      setPostData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // setStart(null);
    // setPostData([]);
    // setHomeData([]);
    getPostData(currentSelectSort);
  }, [currentSelectSort]);
  useEffect(() => {
    getCurrentData(currentSelectSort);
  }, [postData]);

  // const { data: postData } = useQuery({
  //   queryKey: ["postData", currentSelectSort],
  //   queryFn: () => getPostData(currentSelectSort),
  // }); // stale 타임 0.5 초, cache 타임 1 초
  console.log("전체 데이터", postData);
  // ===========================

  //  ====================== 페이지네이션 아이콘 (화살표, 숫자) 클릭하면 호출되는 로직 ==================
  // 쿼리 생성 함수

  const queryMakePageHandler = (currentSelectSort) => {
    let queryContent;
    if (currentSelectSort === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(5),
        startAt(start)
      );
    } else if (currentSelectSort === "예전글 순으로 보기") {
      queryContent = queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime"), // createTime 기준으로 내림차순으로 정렬
        limit(5),
        startAt(start)
      );
    } else if (currentSelectSort === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc"),
        limit(5),
        startAt(start)
      );
    } else if (currentSelectSort === "나의 지역 글만 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("userLocation", "==", location),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(5),
        startAt(start)
      );
    }
    return queryContent;
  };
  // 쿼리 함수, 현재 사용자가 보고 있는 현재 데이터를 가져오는 함수
  const getCurrentData = async (currentSelectSort) => {
    try {
      console.log("호출한다");
      setDataAddLoading(true);
      let q = queryMakePageHandler(currentSelectSort);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      console.log("날라오는 데이터", data);
      if (data.length === 0) {
        setNoFunc(true);
      }
      if (data.length === 5) {
        setStart(data[4].createTime);
        setHomeData((prev) => prev.concat(data.slice(0, 4)));
      } else if (data.length < 5) {
        setStart(null);
        setHomeData((prev) => prev.concat(data));
      }

      console.log("엥");
      setDataAddLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  console.log("nofunc", noFunc);
  const ref = useRef();
  const onintersection = (ent) => {
    console.log("entries", ent);
    console.log(noFunc);
    const fir = ent[0];
    if (noFunc) {
      return;
    }

    const fet = throttle(() => {
      if (fir.isIntersecting) {
        setDataAddLoading(true);
        getCurrentData(currentSelectSort);
      }
    }, 2000);

    fet();
  };

  useEffect(() => {
    const obs = new IntersectionObserver(onintersection);
    if (ref.current) {
      obs.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        obs.unobserve(ref.current);
      }
    };
  }, [start]);
  // useBottomScrollListener(() => {
  //   console.log("hello");

  //   if (!noFunc) {
  //     console.log("호출해");
  //     getCurrentData(currentSelectSort);
  //   }
  // });

  // 현재 사용자가 보고 있는 페이지의 데이터를 서버에서 가져오는 쿼리 코드
  // const { data: currentData, isLoading: currentDataIsLoading } = useQuery({
  //   queryKey: ["pageHandle", currentSelectSort, currentPage],
  //   queryFn: () => getCurrentData(currentSelectSort, currentPage),
  //   enabled: !!postData,
  //   keepPreviousData: true,
  // });
  console.log("현재 데이터", homeData);
  console.log("로딩", homeDataLoading);

  // 사용자가 드롭박스에서 게시글 분류 방법을 선택해 클릭하면 호출되는 콜백함수, 사용자가 클릭한 분류 방법에 해당하는 데이터를 서버에 요청해 데이터를 받아오는 함수
  const onclickSelectSortChange = (selectMethod) => {
    setCurrentSelectSort(selectMethod);
    setHomeData([]);
    setNoFunc(false);
  };
  // =======================
  return (
    <>
      <HomeSlide />
      <S.HomeContainer>
        <TopPost title="food" />
        <TopPost title="cafe" />
        <TopPost title="popup" />
        <TopPost title="festival" />
        <TopPost title="birth" />
        <SelectSortDropBox onclickSelectSortChange={onclickSelectSortChange} />
        {firebaseInitial && homeDataLoading ? (
          <Loading>
            <FadeLoader color="black" size={20} />
          </Loading>
        ) : homeData && homeData.length === 0 ? (
          <S.EmptyPost>현재 게시물이 없습니다.</S.EmptyPost>
        ) : (
          <>
            <S.AllPostBox>
              {homeData &&
                homeData.map((data, index) => {
                  return <PostItem key={index} data={data} />;
                })}
              {dataAddLoading
                ? homeDummyData.map((item) => <S.Skeleton />)
                : null}
              <div ref={ref}></div>
            </S.AllPostBox>

            {/* {postData && homeData && (
              <PageNation currentData={homeData} postData={postData} />
            )} */}
          </>
        )}
      </S.HomeContainer>
    </>
  );
};

export default Home;
