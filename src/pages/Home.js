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
  startAfter,
  endBefore,
} from "firebase/firestore";
import * as S from "../styles/pages/Home.style";
import PostItem from "../components/Home/PostItem";
import TopPost from "../components/Home/TopPost";
import SelectSortDropBox from "../components/SelectSortDropBox";
import HomeSlide from "../components/Home/HomeSlide";
import { useRecoilState, useRecoilValue } from "recoil";
import { firebaseInitialize } from "../recoils/UserAtom";
import { Loading } from "../styles/components/Loading.style";
import { FadeLoader, PulseLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { debounce, throttle } from "lodash";
import Login from "../components/Login/Login";
// ============================================ Home(메인) 페이지 ===================================
// 사용자들이 게시한 게시물들을 한번에 볼 수 있고 ß좋아요를 가장 많이 받은 순서대로 1~12위까지 한번에 볼 수 있는 페이지 입니다.
// 모든 게시글들도 사용자가 드롭박스에서 분류 방법을 선택하여 원하는 분류 방식의 게시글들을 볼 수 있습니다.
// ===============================================================================================
const homeDummyData = [1, 2, 3, 4];
const Home = () => {
  // 서버의 전체 게시글 데이터 state
  const [postData, setPostData] = useState([]);
  // 화면에 보여줄 전체 게시글 데이터
  const [homeData, setHomeData] = useState([]);

  const [postDataLoading, setPostDataLoading] = useState(true);

  // 데이터 추가로 요청할 때 로딩
  const [dataAddLoading, setDataAddLoading] = useState(false);

  // 현재 로그인한 사람의 정보
  const firebaseInitial = useRecoilValue(firebaseInitialize);

  // 게시글 분류 방법을 담고 있는state
  const [currentSelectSort, setCurrentSelectSort] =
    useState("최신글 순으로 보기");

  // 데이터를 불러오는 함수 실행 해야할지에 대한 여부 state
  const [noFunc, setNoFunc] = useState(false);
  // 요청 할 데이터의 시작점 state
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
    }

    return queryContent;
  };
  const getPostData = async (currentSelectSort) => {
    try {
      const q = postDataQueryMake(currentSelectSort);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setPostDataLoading(false);
      setStart(data[0].createTime);
      setPostData(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPostData(currentSelectSort);
  }, [currentSelectSort]);
  useEffect(() => {
    getCurrentData(currentSelectSort);
  }, [postData]);

  // const { data: postData } = useQuery({
  //   queryKey: ["postData", currentSelectSort],
  //   queryFn: () => getPostData(currentSelectSort),
  // }); // stale 타임 0.5 초, cache 타임 1 초
  // ===========================

  // 쿼리 생성 함수

  const queryMakePageHandler = (currentSelectSort) => {
    let queryContent;
    if (currentSelectSort === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(5),
        startAfter(start)
      );
    } else if (currentSelectSort === "예전글 순으로 보기") {
      queryContent = queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime"), // createTime 기준으로 내림차순으로 정렬
        limit(5),
        startAfter(start)
      );
    } else if (currentSelectSort === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc"),

        startAfter(start)
      );
    }
    return queryContent;
  };
  // 쿼리 함수, 현재 사용자가 보고 있는 현재 데이터를 가져오는 함수
  const getCurrentData = async (currentSelectSort) => {
    try {
      setDataAddLoading(true);
      let q = queryMakePageHandler(currentSelectSort);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      if (currentSelectSort === "좋아요 순으로 보기") {
        setHomeData((prev) => prev.concat(data));
        setNoFunc(true);
        setStart(null);
      }
      if (data.length === 5) {
        // 데이터가 5개면
        // 마지막 데이터의 생성시간 저장
        setStart(data[4].createTime);
        // 현재 홈에 뿌리는 전체 게시글 데이터에 data 합치기
        // start 에 기록하는 데이터는 빼고
        setHomeData((prev) => prev.concat(data));
      } else if (data.length < 5) {
        // 데이터가 5개 이하이면 이제 모든 데이터를 불러온거니까 데이터 요청 막기
        setNoFunc(true);
        setStart(null);
        setHomeData((prev) => prev.concat(data));
      }
      setDataAddLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const ref = useRef();

  // 뷰포트에서 타켓이 교차하여 호출되는 콜백함수
  const onintersection = (entries) => {
    // intersectionObserveEntry 객체의 리스트가 매개변수로 전달 됨

    // 하나의 타켓만 설정하였기 때문에 가장 첫번째 요소를 꺼냄
    const targetData = entries[0];
    if (noFunc) {
      // 이미 모든 게시글 데이터를 불러왔다면 noFunc state 가 true 일거고 그러면 해당 콜백함수를 실행 할 필요 없음 리턴
      return;
    }

    // 너무 많은 호출을 방지하기 위해서 lodash 의 throttle 사용 반복 이벤트 발생하면 실제 반복 주기와 상관없이 임의로 설정한 시간 간격으로 콜백함수의 실행을 보장해주는 기능
    const fet = throttle(() => {
      // isIntersecting 속성 사용하기, 해당 속성이 뷰포트 영역에서 타겟과 교차하면 true 아니라면 false, 따라서 true 라면 추가 데이터 요청하기
      if (targetData.isIntersecting) {
        getCurrentData(currentSelectSort);
      }
    }, 2000);

    fet();
  };

  useEffect(() => {
    // 생성자를 통해서 IntersectionObserver 객체 생성
    const obs = new IntersectionObserver(onintersection);

    // ref.current 에 관찰할 돔 (태그) 가 있다면 그 돔을 관찰 시작
    if (ref.current) {
      obs.observe(ref.current);
    }
    return () => {
      // unmount, update 시에 관찰 중지
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

  // 사용자가 드롭박스에서 게시글 분류 방법을 선택해 클릭하면 호출되는 콜백함수, 사용자가 클릭한 분류 방법에 해당하는 데이터를 서버에 요청해 데이터를 받아오는 함수
  const onclickSelectSortChange = (selectMethod) => {
    if (currentSelectSort === selectMethod) {
      return;
    }
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
        <SelectSortDropBox onclickSelectSortChange={onclickSelectSortChange} />
        {postDataLoading ? (
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
          </>
        )}
      </S.HomeContainer>
    </>
  );
};

export default Home;
