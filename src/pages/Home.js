import { dbService } from "../reactfbase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  startAt,
  limit,
  where,
} from "firebase/firestore";
import * as HomeStyle from "../styles/pages/HomeStyle";
import PostItem from "../components/PostItem";
import TopPost from "../components/TopPost";
import SelectSortDropBox from "../components/SelectSortDropBox";
import PageNation from "../components/PageNation";
import HomeSlide from "../components/HomeSlide";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentPageAtom,
  currentSelectSortAtom,
  firebaseInitialize,
  userLocation,
} from "../recoils/UserAtom";
import { Loading } from "../styles/componenet/LoadingStyle";
import { PulseLoader } from "react-spinners";

// ============================================ Home(메인) 페이지 ===================================
// 사용자들이 게시한 게시물들을 한번에 볼 수 있고 사용자들이 좋아요를 눌러 좋아요를 가장 많이 받은 순서대로 1~10위까지 한번에 볼 수 있는 페이지 입니다.
// 게시글들도 사용자가 드롭박스에서 분류 방법을 선택하여 원하는 분류 방식의 게시글들을 볼 수 있습니다.
// ===============================================================================================
const Home = () => {
  const firebaseInitial = useRecoilValue(firebaseInitialize);
  const location = useRecoilValue(userLocation);
  const currentPage = useRecoilValue(currentPageAtom);
  // 게시글 분류 방법을 담고 있는 state
  const [currentSelectSort, setCurrentSelectSort] = useRecoilState(
    currentSelectSortAtom
  );
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
        where("userLocation", "==", userLocation),
        orderBy("createTime", "desc")
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
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  const { data: postData } = useQuery(
    ["postData", currentSelectSort],
    () => getPostData(currentSelectSort),
    { cacheTime: 500 }
  ); // stale 타임 0.5 초, cache 타임 1 초

  // ===========================

  //  ====================== 페이지네이션 아이콘 (화살표, 숫자) 클릭하면 호출되는 로직 ==================
  // 쿼리 생성 함수
  const queryMakePageHandler = (currentSelectSort, currentPage) => {
    let queryContent;
    if (currentSelectSort === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        startAt(postData[currentPage * 8].createTime)
      );
    } else if (currentSelectSort === "예전글 순으로 보기") {
      queryContent = queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        startAt(postData[currentPage * 8].createTime)
      );
    } else if (currentSelectSort === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc"),
        limit(8),
        startAt(postData[currentPage * 8].likeNumber)
      );
    } else if (currentSelectSort === "나의 지역 글만 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("userLocation", "==", location),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        startAt(postData[currentPage * 8].createTime)
      );
    }
    return queryContent;
  };
  // 쿼리 함수
  const getCurrentData = async (currentSelectSort, currentPage) => {
    try {
      let q = queryMakePageHandler(currentSelectSort, currentPage);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  // 쿼리 코드
  const { data: currentData, isLoading: currentDataIsLoading } = useQuery(
    ["pageHandle", currentSelectSort, currentPage],
    () => getCurrentData(currentSelectSort, currentPage),
    {
      enabled: !!postData,
      keepPreviousData: true,
    }
  );
  // =======================
  return (
    <>
      <HomeSlide />
      <HomeStyle.HomeBack>
        <TopPost />
        <SelectSortDropBox />
        {firebaseInitial && currentDataIsLoading ? (
          <Loading>
            <PulseLoader color="black" size={20} />
          </Loading>
        ) : currentData && currentData.length === 0 ? (
          <HomeStyle.EmptyPost>현재 게시물이 없습니다.</HomeStyle.EmptyPost>
        ) : (
          <>
            <HomeStyle.PostLayout>
              {currentData &&
                currentData.map((data, index) => {
                  return <PostItem key={index} data={data} />;
                })}
            </HomeStyle.PostLayout>
            {postData && currentData && (
              <PageNation currentData={currentData} postData={postData} />
            )}
          </>
        )}
      </HomeStyle.HomeBack>
    </>
  );
};

export default Home;
