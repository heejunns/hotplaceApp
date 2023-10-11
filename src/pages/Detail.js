import React, { useRef } from "react";
import * as DetailStyle from "../styles/pages/DetailStyle";
import { useRecoilValue } from "recoil";
import { clickPostItemData, userAtom } from "../recoils/UserAtom";
import PostMap from "../components/PostMap";
import { useState } from "react";
import { useCallback } from "react";
import DeleteModal from "../components/PostDeleteModal";
import EditModal from "../components/EditModal";
import Comments from "../components/Comment";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../reactfbase";
import PostDeleteModal from "../components/PostDeleteModal";
import { Loading } from "../styles/componenet/LoadingStyle";
const Detail = () => {
  const user = useRecoilValue(userAtom);
  const data = useRecoilValue(clickPostItemData);
  console.log("data", data);
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
      return Math.round(minute) === 0 ? "지금" : `${Math.round(minute)}분 전`;
    } else if (Math.round(minute) > 59 && Math.round(minute / 60) < 24) {
      return `${Math.round(minute / 60)}시간 전`;
    } else if (
      Math.round(minute / 60) > 23 &&
      Math.round(minute / 60 / 24) < 31
    ) {
      return `${Math.round(minute / 60 / 24)}일 전`;
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
  const onclickLike = async () => {
    console.log("좋아요 클릭 멤버", detailData.likeMember);
    console.log("유저 아이디", user);
    let newLikeMember;
    if (
      detailData.likeMember.length === 0 ||
      !detailData.likeMember.includes(user.uid)
    ) {
      newLikeMember = [...detailData.likeMember, user.uid];
    } else if (detailData.likeMember.includes(user.uid)) {
      newLikeMember = detailData.likeMember.filter((item) => {
        return item !== user.uid;
      });
    }

    console.log("멤버", newLikeMember);
    console.log("멤버 수", newLikeMember.length);

    await updateDoc(doc(dbService, "test", data.id), {
      likeMember: newLikeMember,
      likeNumber: newLikeMember.length,
    });
    setIsChangeData((prev) => !prev);
  };
  console.log("디테일 데이터 아이디", data);
  return (
    <>
      <DetailStyle.DetailBack>
        <DetailStyle.DetailBox>
          <DetailStyle.DetailTitleBox>
            <DetailStyle.DetailTitleText>
              {detailData && detailData.nickname} 님의 게시물
            </DetailStyle.DetailTitleText>
            <DetailStyle.DetailTitleBoxRight>
              <DetailStyle.DetailBtn onClick={onclickLike}>
                <span class="material-symbols-outlined">favorite</span>
                <span>{detailData && detailData.likeMember.length}</span>
              </DetailStyle.DetailBtn>
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
            </DetailStyle.DetailTitleBoxRight>
          </DetailStyle.DetailTitleBox>

          <DetailStyle.DetailPostNameBox>
            <DetailStyle.DetailItemTitle>매장 이름</DetailStyle.DetailItemTitle>
            <DetailStyle.DetailPostName>
              {detailData && detailData.postName}
            </DetailStyle.DetailPostName>
          </DetailStyle.DetailPostNameBox>
          <DetailStyle.DetailImgBox>
            {/* <DetailStyle.DetailTitleBox>자세한 사진</DetailStyle.DetailTitleBox> */}
            <img
              src={detailData && detailData.uploadImgUrl}
              alt="게시글 이미지"
            />
          </DetailStyle.DetailImgBox>
          <DetailStyle.DetailMainText>
            <DetailStyle.DetailItemTitle>
              자세한 내용
            </DetailStyle.DetailItemTitle>
            {detailData && detailData.inputText}
          </DetailStyle.DetailMainText>
          <DetailStyle.DetailMap>
            <DetailStyle.DetailItemTitle>위치</DetailStyle.DetailItemTitle>
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
