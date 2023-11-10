import { useParams } from "react-router-dom";
import * as PageStyle from "../styles/pages/PageStyle";
import { useCallback, useEffect, useState } from "react";
import { dbService } from "../reactfbase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import PostItem from "../components/PostItem";
const Page = () => {
  const { id } = useParams();
  const [idState, setId] = useState(id);
  const [pagePostData, setPagePostData] = useState(null);
  const [pageCurrentData, setPageCurrentData] = useState(null);
  console.log("응?", id === "cafe");
  const queryMake = (pageId) => {
    let queryContent;
    console.log("pageid", pageId);
    console.log("뭐냐고?");
    if (pageId === "cafe") {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "카페"),
        orderBy("createTime", "desc")
      );
    } else if (pageId === "mart") {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "마트"),
        orderBy("createTime", "desc")
      );
    } else if (pageId === "food") {
      queryContent = query(
        collection(dbService, "test"),
        where("category", "==", "음식"),
        orderBy("createTime", "desc")
      );
      // } else if (pageId === "나의 지역 게시글만 보기") {
      //   queryContent = query(
      //     collection(dbService, "test"),
      //     where("userLocation", "==", userLocation),
      //     orderBy("createTime", "desc")
      //   );
      // }
    }
    return queryContent;
  };

  useEffect(() => {
    const getFirstPostData = async () => {
      try {
        const q = queryMake(id);
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
      <PageStyle.PostBox>
        {pageCurrentData &&
          pageCurrentData.map((data, index) => {
            return (
              <PostItem
                key={index}
                data={data}
                index={index}
                dataLen={pageCurrentData.length}
              />
            );
          })}
      </PageStyle.PostBox>
    </PageStyle.PageBack>
  );
};

export default Page;
