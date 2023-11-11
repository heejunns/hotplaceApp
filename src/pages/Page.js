import { useParams } from "react-router-dom";
import * as PageStyle from "../styles/pages/PageStyle";
import { useCallback, useEffect, useState } from "react";
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
const Page = ({ userLocation }) => {
  console.log("위치", userLocation);
  const { id } = useParams();
  const [idState, setId] = useState(id);
  const [pagePostData, setPagePostData] = useState(null);
  const [pageCurrentPage, setPageCurrentPage] = useState(0);
  // 게시글 분류 방법을 담고 있는 state
  const [selectSortMethod, setSelectSortMethod] =
    useState("최신글 순으로 보기");
  const [pageCurrentData, setPageCurrentData] = useState(null);
  // const queryMake = (pageId) => {
  //   let queryContent;
  //   console.log("pageid", pageId);
  //   if (pageId === "cafe") {
  //     queryContent = query(
  //       collection(dbService, "test"),
  //       where("category", "==", "카페"),
  //       orderBy("createTime", "desc")
  //     );
  //   } else if (pageId === "mart") {
  //     queryContent = query(
  //       collection(dbService, "test"),
  //       where("category", "==", "마트"),
  //       orderBy("createTime", "desc")
  //     );
  //   } else if (pageId === "food") {
  //     queryContent = query(
  //       collection(dbService, "test"),
  //       where("category", "==", "음식"),
  //       orderBy("createTime", "desc")
  //     );
  // } else if (pageId === "나의 지역 게시글만 보기") {
  //   queryContent = query(
  //     collection(dbService, "test"),
  //     where("userLocation", "==", userLocation),
  //     orderBy("createTime", "desc")
  //   );
  // }
  //   }
  //   return queryContent;
  // };

  useEffect(() => {
    const getFirstPostData = async () => {
      try {
        let category =
          id === "cafe"
            ? "카페"
            : id === "food"
            ? "음식"
            : id === "mart"
            ? "마트"
            : null;
        let q = query(
          collection(dbService, "test"),
          where("category", "==", category),
          orderBy("createTime", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setPagePostData(data);
        setPageCurrentData(data.slice(0, 8));
      } catch (e) {
        console.log(e);
      }
    };
    getFirstPostData();
  }, [id]);
  // 왼쪽, 오른쪽 화살표를 클릭하면 호출되는 콜백함수, 화살표를 클릭했을때 해당하는 데이터를 서버에 요청해 받아오는 함수
  const onclickPageHandler = async (mode) => {
    console.log("mode", mode);
    try {
      let q = query(
        collection(dbService, "test"),
        orderBy("createTime", "desc"), // createTime 기준으로 내림차순으로 정렬
        limit(8),
        mode === 1
          ? startAt(pagePostData[(pageCurrentPage - 1) * 8].createTime)
          : startAt(pagePostData[(pageCurrentPage + 1) * 8].createTime)
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setPageCurrentPage((prev) => (mode === 1 ? prev - 1 : prev + 1));
      setPageCurrentData(data);
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
        startAt(pagePostData[pageNumber * 8].createTime)
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPageCurrentPage(pageNumber);
      setPageCurrentData(data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pageCurrentData);
  console.log(pagePostData);
  return (
    <PageStyle.PageBack>
      {/* <PageStyle.PageTitle>
        {id === "cafe"
          ? "카페 글"
          : id === "mart"
          ? "마트 글 "
          : id === "food"
          ? "음식 글"
          : null}
      </PageStyle.PageTitle> */}
      <SelectSortDropBox
        pageId={id}
        setCurrentData={setPageCurrentData}
        setPostData={setPagePostData}
        selectSortMethod={selectSortMethod}
        setSelectSortMethod={setSelectSortMethod}
        userLocation={userLocation}
      />
      <PageStyle.PostBox>
        {pageCurrentData &&
          pageCurrentData.map((data, index) => {
            return <PostItem key={index} data={data} />;
          })}
      </PageStyle.PostBox>
      {pagePostData && pageCurrentData && (
        <PageNation
          onclickPageHandler={onclickPageHandler}
          onclickPageNumber={onclickPageNumber}
          currentData={pageCurrentData}
          currentPage={pageCurrentPage}
          postData={pagePostData}
        />
      )}
    </PageStyle.PageBack>
  );
};

export default Page;
