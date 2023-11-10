import { useState } from "react";
import * as SelectSortDropBoxStyle from "../styles/componenet/SelectSortDropBoxStyle";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dbService } from "../reactfbase";

const SelectSortDropBox = ({ setCurrentData, setPostData }) => {
  // 게시글 분류 방법을 담고 있는 state
  const [selectSortMethod, setSelectSortMethod] = useState("전체 게시글 보기");
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
    }
    // } else if (selectMethod === "나의 지역 게시글만 보기") {
    //   queryContent = query(
    //     collection(dbService, "test"),
    //     where("userLocation", "==", userLocation),
    //     orderBy("createTime", "desc")
    //   );
    // }

    return queryContent;
  };
  // 사용자가 드롭박스에서 게시글 분류 방법을 선택해 클릭하면 호출되는 콜백함수, 사용자가 클릭한 분류 방법에 해당하는 데이터를 서버에 요청해 데이터를 받아오는 함수
  const onclickSelectSortChange = async (selectMethod) => {
    try {
      setSelectSortMethod(selectMethod);
      // setIsSelectSort((prev) => !prev);
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
  return (
    <SelectSortDropBoxStyle.SelectSortMethodBox>
      <SelectSortDropBoxStyle.SelectSortMethodBtn>
        {selectSortMethod}

        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </SelectSortDropBoxStyle.SelectSortMethodBtn>
      <SelectSortDropBoxStyle.SelectSortMethodList>
        <SelectSortDropBoxStyle.SelectSortMethodItem
          onClick={() => onclickSelectSortChange("전체 게시글 보기")}
        >
          전체 게시글 보기
        </SelectSortDropBoxStyle.SelectSortMethodItem>
        <SelectSortDropBoxStyle.SelectSortMethodItem
          onClick={() => {
            onclickSelectSortChange("카페 게시글 보기");
          }}
        >
          카페 게시글 보기
        </SelectSortDropBoxStyle.SelectSortMethodItem>
        <SelectSortDropBoxStyle.SelectSortMethodItem
          onClick={() => onclickSelectSortChange("음식 게시글 보기")}
        >
          음식 게시글 보기
        </SelectSortDropBoxStyle.SelectSortMethodItem>
        <SelectSortDropBoxStyle.SelectSortMethodItem
          onClick={() => onclickSelectSortChange("마트 게시글 보기")}
        >
          마트 게시글 보기
        </SelectSortDropBoxStyle.SelectSortMethodItem>
        <SelectSortDropBoxStyle.SelectSortMethodItem
          onClick={() => onclickSelectSortChange("좋아요 순으로 보기")}
        >
          좋아요 순으로 보기
        </SelectSortDropBoxStyle.SelectSortMethodItem>
        <SelectSortDropBoxStyle.SelectSortMethodItem
          onClick={() => onclickSelectSortChange("나의 지역 게시글만 보기")}
        >
          나의 지역 게시글만 보기
        </SelectSortDropBoxStyle.SelectSortMethodItem>
      </SelectSortDropBoxStyle.SelectSortMethodList>
    </SelectSortDropBoxStyle.SelectSortMethodBox>
  );
};

export default SelectSortDropBox;
