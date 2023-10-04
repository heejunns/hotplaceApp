import React, { useRef } from "react";
import * as DetailStyle from "../styles/DetailStyle";
import { useRecoilValue } from "recoil";
import { clickPostItemDataId, userAtom } from "../recoils/UserAtom";
import PostMap from "../components/PostMap";
import { useState } from "react";
import { useCallback } from "react";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import Comments from "../components/Comments";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../reactfbase";
const Detail = () => {
  const user = useRecoilValue(userAtom);
  const dataId = useRecoilValue(clickPostItemDataId);

  const [inputNewText, setInputNewText] = useState(null); // 닉네임을 변경하는 값의 state
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false); // 게시글 수정 모드를 사용하고 있는지 여부 state
  const [editData, setEditData] = useState(null);
  const [mapMode, setMapMode] = useState(false); // 맵을 보는지 여부 state
  const [commentMode, setCommentMode] = useState(false); // 댓글 모드 여부 state
  const [detailData, setDetailData] = useState(null);
  const [isChangeData, setIsChangeData] = useState(false);

  console.log("디테일 데이터", dataId);
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
  // 수정 게시글을 작성할때 input 태그에서 발생하는 onchange 이벤트에 호출되는 콜백함수
  const onchangeAditText = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setInputNewText(value);
  }, []);

  // 게시글 삭제 버튼을 클릭하면 호출되는 콜백함수
  const onclickDeleteButton = (data) => {
    document.body.style.overflow = "hidden";
    setIsDeleteModal((prev) => !prev);
    setDeleteData(data);
  };

  // 게시글 수정 폼을 화면에 보여주고 안보여주고 해주는 함수, 게시글 수정 버튼을 클릭하면 호출하는 콜백함수
  const onclickEditButton = useCallback((data) => {
    setIsEditModal((prev) => !prev);
    setEditData(data);
    document.body.style.overflow = "hidden";
  }, []);
  // 댓글 달기 버튼 클릭하면 호출
  const onclickComments = useCallback(() => {
    setCommentMode((prev) => !prev); // 댓글 기능 열기
    setMapMode(false); // 맵 모드 닫기
  }, []);
  useEffect(() => {
    const getDetailData = async () => {
      try {
        const docRef = doc(dbService, "test", dataId);
        const docSnap = await getDoc(docRef);
        console.log("컴온", docSnap.data());
        setDetailData(docSnap.data());
      } catch (e) {
        console.log(e);
      }
    };
    getDetailData();
  }, [isChangeData]);
  console.log("디테일 데이터 아이디", dataId);
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
                      onClick={() => onclickDeleteButton()}
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
              dataId={dataId}
              data={detailData}
              setIsChangeData={setIsChangeData}
            />
          )}
        </DetailStyle.DetailBox>
      </DetailStyle.DetailBack>
      {isDeleteModal && (
        <DeleteModal
          setIsDeleteModal={setIsDeleteModal}
          deleteData={deleteData}
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
