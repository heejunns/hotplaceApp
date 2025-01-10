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
  const { id } = useParams();
  console.log("id", id);
  const [pagePostData, setPagePostData] = useState(null);
  const [pageCurrentDataIsLoading, setPageCurrentDataIsLoading] =
    useState(false);
  // 게시글 분류 방법을 담고 있는 state
  const [currentSelectSort, setCurrentSelectSort] =
    useState("최신글 순으로 보기");
  // const [pageCurrentData, setPageCurrentData] = useState(null);
  const pagePostDataQueryMake = (currentSelectSort, id) => {
    let queryContent;
    let category = id === "cafe" ? "카페" : id === "food" ? "음식" : null;
    if (currentSelectSort === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", category),
        orderBy("createTime", "desc")
      );
    } else if (currentSelectSort === "예전글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", category),
        orderBy("createTime")
      );
    } else if (currentSelectSort === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", category),
        orderBy("likeNumber", "desc")
      );
    }
    console.log("console", currentSelectSort, category);
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
  }, [id, currentSelectSort]);

  // 왼쪽, 오른쪽 화살표를 클릭하면 호출되는 콜백함수, 화살표를 클릭했을때 해당하는 데이터를 서버에 요청해 받아오는 함수

  // const { data: pageCurrentData, isLoading: pageCurrentDataIsLoading } =
  //   useQuery({
  //     queryKey: ["pageHandle", currentSelectSort, currentPage, id],
  //     queryFn: () => getPageCurrentData(currentSelectSort, currentPage, id),

  //     enabled: !!pagePostData,
  //     keepPreviousData: true,
  //   });

  const onclickSelectSortChange = (selectMethod) => {
    setCurrentSelectSort(selectMethod);
    setPagePostData([]);
  };

  return (
    <S.PageBack>
      <SelectSortDropBox onclickSelectSortChange={onclickSelectSortChange} />

      {firebaseInitial && pageCurrentDataIsLoading ? (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      ) : pagePostData && pagePostData.length === 0 ? (
        <S.EmptyPost>현재 게시물이 없습니다.</S.EmptyPost>
      ) : (
        <>
          <S.PostBox>
            {pagePostData &&
              pagePostData.map((data, index) => {
                return <PostItem key={index} data={data} />;
              })}
          </S.PostBox>
        </>
      )}
    </S.PageBack>
  );
};

export default Page;
