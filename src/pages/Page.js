import { useParams } from "react-router-dom";
import * as S from "../styles/pages/Page.style";
import { dbService } from "../reactfbase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import PostItem from "../components/Home/PostItem";
import PageNation from "../components/Home/PageNation";
import SelectSortDropBox from "../components/SelectSortDropBox";
import {
  currentPageAtom,
  currentSelectSortAtom,
  firebaseInitialize,
  userLocation,
} from "../recoils/UserAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import { useEffect, useState } from "react";
const Page = () => {
  const firebaseInitial = useRecoilValue(firebaseInitialize);
  const location = useRecoilValue(userLocation);
  const { id } = useParams();
  const [pagePostData, setPagePostData] = useState(null);
  const [pageCurrentData, setPageCurrentData] = useState(null);
  const [pageCurrentDataIsLoading, setPageCurrentDataIsLoading] =
    useState(false);
  const currentPage = useRecoilValue(currentPageAtom);
  // 게시글 분류 방법을 담고 있는 state
  const [currentSelectSort, setCurrentSelectSort] = useRecoilState(
    currentSelectSortAtom
  );
  // const [pageCurrentData, setPageCurrentData] = useState(null);
  const pagePostDataQueryMake = (currentSelectSort, id) => {
    let queryContent;
    let category =
      id === "cafe"
        ? "카페"
        : id === "food"
        ? "음식"
        : id === "mart"
        ? "마트"
        : null;
    if (currentSelectSort === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        category === "전체" ? null : where("category", "==", category),
        orderBy("createTime", "desc")
      );
    } else if (currentSelectSort === "예전글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        category === "전체" ? null : where("category", "==", category),
        orderBy("createTime")
      );
    } else if (currentSelectSort === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        category === "전체" ? null : where("category", "==", category),
        orderBy("likeNumber", "desc")
      );
    } else if (currentSelectSort === "나의 지역 글만 보기") {
      queryContent = query(
        collection(dbService, "test"),
        category === "전체" ? null : where("category", "==", category),
        where("userLocation", "==", location),
        orderBy("createTime", "desc")
      );
    }

    return queryContent;
  };
  const getPagePostData = async (currentSelectSort, id) => {
    try {
      let q = pagePostDataQueryMake(currentSelectSort, id);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setPagePostData(data);
    } catch (e) {
      console.log(e);
    }
  };

  // const { data: pagePostData } = useQuery(
  //   ["pagePostData", currentSelectSort, id],
  //   () => getPagePostData(currentSelectSort, id)
  // );
  useEffect(() => {
    getPagePostData(currentSelectSort, id);
  }, [id]);
  useEffect(() => {
    getPageCurrentData(currentSelectSort, currentPage, id);
  }, [pagePostData]);
  // 왼쪽, 오른쪽 화살표를 클릭하면 호출되는 콜백함수, 화살표를 클릭했을때 해당하는 데이터를 서버에 요청해 받아오는 함수

  // 페이지네이션에서 숫자를 클릭하면 호출되는 콜백함수, 클릭한 숫자에 해당하는 데이터를 서버에 요청해 받아오는 함수
  const pageQueryMakePageHandler = (currentSelectSort, currentPage, id) => {
    let queryContent;
    let category =
      id === "cafe"
        ? "카페"
        : id === "food"
        ? "음식"
        : id === "mart"
        ? "마트"
        : null;
    if (currentSelectSort === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        category === "전체" ? null : where("category", "==", category),
        limit(8),
        startAt(pagePostData[currentPage * 8].createTime)
      );
    } else if (currentSelectSort === "예전글 순으로 보기") {
      queryContent = queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime"), // createTime 기준으로 내림차순으로 정렬
        category === "전체" ? null : where("category", "==", category),
        limit(8),
        startAt(pagePostData[currentPage * 8].createTime)
      );
    } else if (currentSelectSort === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc"),
        category === "전체" ? null : where("category", "==", category),
        limit(8),
        startAt(pagePostData[currentPage * 8].likeNumber)
      );
    } else if (currentSelectSort === "나의 지역 게시글만 보기") {
      queryContent = query(
        collection(dbService, "test"),
        category === "전체" ? null : where("category", "==", category),
        where("userLocation", "==", location),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        startAt(pagePostData[currentPage * 8].createTime)
      );
    }
    return queryContent;
  };

  const getPageCurrentData = async (currentSelectSort, currentPage, id) => {
    try {
      setPageCurrentDataIsLoading(true);
      let q = pageQueryMakePageHandler(currentSelectSort, currentPage, id);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPageCurrentData(data);
      setPageCurrentDataIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // const { data: pageCurrentData, isLoading: pageCurrentDataIsLoading } =
  //   useQuery({
  //     queryKey: ["pageHandle", currentSelectSort, currentPage, id],
  //     queryFn: () => getPageCurrentData(currentSelectSort, currentPage, id),

  //     enabled: !!pagePostData,
  //     keepPreviousData: true,
  //   });

  return (
    <S.PageBack>
      <SelectSortDropBox />

      {firebaseInitial && pageCurrentDataIsLoading ? (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      ) : pageCurrentData && pageCurrentData.length === 0 ? (
        <S.EmptyPost>현재 게시물이 없습니다.</S.EmptyPost>
      ) : (
        <>
          <S.PostBox>
            {pageCurrentData &&
              pageCurrentData.map((data, index) => {
                return <PostItem key={index} data={data} />;
              })}
          </S.PostBox>
          {pagePostData && pageCurrentData && (
            <PageNation currentData={pageCurrentData} postData={pagePostData} />
          )}
        </>
      )}
    </S.PageBack>
  );
};

export default Page;
