import { useParams } from "react-router-dom";
import * as PageStyle from "../styles/pages/PageStyle";
import { useState } from "react";
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
import PostItem from "../components/PostItem";
import PageNation from "../components/PageNation";
import SelectSortDropBox from "../components/SelectSortDropBox";
import { useQuery } from "react-query";
const Page = ({ userLocation }) => {
  const { id } = useParams();
  // const [pagePostData, setPagePostData] = useState(null);
  const [pageCurrentPage, setPageCurrentPage] = useState(0);
  // 게시글 분류 방법을 담고 있는 state
  const [pageSelectSortMethod, setPageSelectSortMethod] =
    useState("최신글 순으로 보기");
  // const [pageCurrentData, setPageCurrentData] = useState(null);

  const pagePostDataQueryMake = (pageSelectSortMethod, id) => {
    let queryContent;
    let category =
      id === "cafe"
        ? "카페"
        : id === "food"
        ? "음식"
        : id === "mart"
        ? "마트"
        : null;
    if (pageSelectSortMethod === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        category === "전체" ? null : where("category", "==", category),
        orderBy("createTime", "desc")
      );
    } else if (pageSelectSortMethod === "예전글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        category === "전체" ? null : where("category", "==", category),
        orderBy("createTime")
      );
    } else if (pageSelectSortMethod === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        category === "전체" ? null : where("category", "==", category),
        orderBy("likeNumber", "desc")
      );
    } else if (pageSelectSortMethod === "나의 지역 글만 보기") {
      queryContent = query(
        collection(dbService, "test"),
        where("userLocation", "==", userLocation),
        orderBy("createTime", "desc")
      );
    }

    return queryContent;
  };
  const getPagePostData = async (pageSelectSortMethod, id) => {
    try {
      let q = pagePostDataQueryMake(pageSelectSortMethod, id);
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

  const { data: pagePostData } = useQuery(
    ["pagePostData", pageSelectSortMethod, id],
    () => getPagePostData(pageSelectSortMethod, id)
  );
  // useEffect(() => {
  //   getFirstPostData();
  // }, [id]);
  // 왼쪽, 오른쪽 화살표를 클릭하면 호출되는 콜백함수, 화살표를 클릭했을때 해당하는 데이터를 서버에 요청해 받아오는 함수

  // 페이지네이션에서 숫자를 클릭하면 호출되는 콜백함수, 클릭한 숫자에 해당하는 데이터를 서버에 요청해 받아오는 함수
  const pageQueryMakePageHandler = (selectSortMethod, currentPage, id) => {
    let queryContent;
    let category =
      id === "cafe"
        ? "카페"
        : id === "food"
        ? "음식"
        : id === "mart"
        ? "마트"
        : null;
    if (selectSortMethod === "최신글 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        category === "전체" ? null : where("category", "==", category),
        limit(8),
        startAt(pagePostData[currentPage * 8].createTime)
      );
    } else if (selectSortMethod === "예전글 순으로 보기") {
      queryContent = queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime"), // createTime 기준으로 내림차순으로 정렬
        category === "전체" ? null : where("category", "==", category),
        limit(8),
        startAt(pagePostData[currentPage * 8].createTime)
      );
    } else if (selectSortMethod === "좋아요 순으로 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("likeNumber", "desc"),
        category === "전체" ? null : where("category", "==", category),
        limit(8),
        startAt(pagePostData[currentPage * 8].likeNumber)
      );
    } else if (selectSortMethod === "나의 지역 게시글만 보기") {
      queryContent = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        category === "전체" ? null : where("category", "==", category),
        limit(8),
        startAt(pagePostData[currentPage * 8].createTime)
      );
    }
    return queryContent;
  };

  const getPageCurrentData = async (selectSortMethod, currentPage, id) => {
    try {
      let q = pageQueryMakePageHandler(selectSortMethod, currentPage, id);
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

  const { data: pageCurrentData } = useQuery(
    ["pageHandle", pageSelectSortMethod, pageCurrentPage, id],
    () => getPageCurrentData(pageSelectSortMethod, pageCurrentPage, id),
    {
      enabled: !!pagePostData,
      keepPreviousData: true,
    }
  );
  return (
    <PageStyle.PageBack>
      <SelectSortDropBox
        selectSortMethod={pageSelectSortMethod}
        setSelectSortMethod={setPageSelectSortMethod}
        setCurrentPage={setPageCurrentPage}
      />
      <PageStyle.PostBox>
        {pageCurrentData &&
          pageCurrentData.map((data, index) => {
            return <PostItem key={index} data={data} />;
          })}
      </PageStyle.PostBox>
      {pagePostData && pageCurrentData && (
        <PageNation
          selectSortMethod={pageSelectSortMethod}
          currentData={pageCurrentData}
          currentPage={pageCurrentPage}
          postData={pagePostData}
          setCurrentPage={setPageCurrentPage}
        />
      )}
    </PageStyle.PageBack>
  );
};

export default Page;
