import React, { useRef } from "react";
import * as DetailStyle from "../styles/DetailStyle";
import { useRecoilValue } from "recoil";
import { clickPostItemData, userAtom } from "../recoils/UserAtom";
import PostMap from "../components/PostMap";
import { useState } from "react";
import { useCallback } from "react";
import DeleteModal from "../components/PostDeleteModal";
import EditModal from "../components/EditModal";
import Comments from "../components/Comments";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../reactfbase";
import PostDeleteModal from "../components/PostDeleteModal";
const Detail = () => {
  const user = useRecoilValue(userAtom);
  const data = useRecoilValue(clickPostItemData);

  const [isPostDeleteModal, setIsPostDeleteModal] = useState(false);
  const [postDeleteData, setPostDeleteData] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false); // 게시글 수정 모드를 사용하고 있는지 여부 state
  const [editData, setEditData] = useState(null);
  const [detailData, setDetailData] = useState(data);
  const [isChangeData, setIsChangeData] = useState(false);

  console.log("디테일 데이터", data);
  const calculateTime = (data) => {
    // 게시글을 올린지 얼마나 지났는지 시간을 계산하는 함수
    const minute = (Date.now() - data.createTime) / 1000 / 60;
    if (Math.round(minute) < 60) {
      return Math.round(minute) === 0 ? "지금" : `${Math.round(minute)} 분 전`;
    } else if (Math.round(minute) > 59 && Math.round(minute / 60) < 24) {
      return `${Math.round(minute / 60)} 시간 전`;
    } else if (
      Math.round(minute / 60) > 23 &&
      Math.round(minute / 60 / 24) < 31
    ) {
      return `${Math.round(minute / 60)} 일 전`;
    } else if (Math.round(minute / 60 / 24) > 30) {
      return "한달 전";
    }
  };

  // 게시글 삭제 버튼을 클릭하면 호출되는 콜백함수
  const onclickDeleteButton = (data) => {
    document.body.style.overflow = "hidden";
    setIsPostDeleteModal((prev) => !prev);
    setPostDeleteData(data);
  };

  // 게시글 수정 폼을 화면에 보여주고 안보여주고 해주는 함수, 게시글 수정 버튼을 클릭하면 호출하는 콜백함수
  const onclickEditButton = useCallback((data) => {
    setIsEditModal((prev) => !prev);
    setEditData(data);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    const getDetailData = async () => {
      try {
        const docRef = doc(dbService, "test", data.id);
        const docSnap = await getDoc(docRef);
        console.log("컴온", docSnap.data());
        setDetailData(docSnap.data());
      } catch (e) {
        console.log(e);
      }
    };
    getDetailData();
  }, [isChangeData]);
  console.log("디테일 데이터 아이디", data);
  return (
    <>
      <DetailStyle.DetailBack>
        <DetailStyle.DetailBox>
          <DetailStyle.DetailTitleBox>
            <DetailStyle.DetailTitleText>
              {detailData && detailData.nickname} 님의 게시물
            </DetailStyle.DetailTitleText>
            <DetailStyle.DetailTitleBoxLeft>
              <DetailStyle.DetailBtnBox>
                {detailData && detailData.writer === user.uid && (
                  <>
                    <DetailStyle.DetailBtn
                      onClick={() => onclickDeleteButton(data)}
                    >
                      <span class="material-symbols-outlined">delete</span>
                    </DetailStyle.DetailBtn>
                    <DetailStyle.DetailBtn onClick={() => onclickEditButton()}>
                      <span class="material-symbols-outlined">edit</span>
                    </DetailStyle.DetailBtn>
                  </>
                )}
              </DetailStyle.DetailBtnBox>
              <DetailStyle.DetailTitleText>
                {detailData && calculateTime(detailData)} /
              </DetailStyle.DetailTitleText>
              <DetailStyle.DetailTitleText>
                {detailData && detailData.category}
              </DetailStyle.DetailTitleText>
            </DetailStyle.DetailTitleBoxLeft>
          </DetailStyle.DetailTitleBox>
          <DetailStyle.DetailImgBox>
            <img
              src={detailData && detailData.uploadImgUrl}
              alt="게시글 이미지"
            />
          </DetailStyle.DetailImgBox>
          <DetailStyle.DetailMainText>
            {detailData && detailData.inputText}
          </DetailStyle.DetailMainText>
          <DetailStyle.DetailMap>
            {detailData && <PostMap data={detailData} />}
          </DetailStyle.DetailMap>
          {detailData && (
            <Comments
              dataId={data.id}
              data={detailData}
              setIsChangeData={setIsChangeData}
            />
          )}
        </DetailStyle.DetailBox>
      </DetailStyle.DetailBack>
      {isPostDeleteModal && (
        <PostDeleteModal
          setIsPostDeleteModal={setIsPostDeleteModal}
          postDeleteData={postDeleteData}
        />
      )}
      {isEditModal && (
        <EditModal
          setIsEditModal={setIsEditModal}
          editData={editData}
        ></EditModal>
      )}
    </>
  );
};

export default Detail;