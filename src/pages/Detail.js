import React from "react";
import * as DetailStyle from "../styles/pages/DetailStyle";
import { useRecoilValue } from "recoil";
import { clickPostItemData, userAtom } from "../recoils/UserAtom";
import PostMap from "../components/PostMap";
import { useState } from "react";
import { useCallback } from "react";
import EditModal from "../components/EditModal";
import Comments from "../components/Comment";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../reactfbase";
import PostDeleteModal from "../components/PostDeleteModal";
import ReportModal from "../components/ReportModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
// =============================================== 디테일 페이지 ================================================
// 사용자가 게시글을 클릭하면 게시글에대한 자세한 내용을 확인 할 수 있는 페이지 입니다.
// ===========================================================================================================
const Detail = () => {
  const queryClient = useQueryClient();
  // 현재 로그인중인 사용자의 정보를 전역 상태에서 가져오기
  const user = useRecoilValue(userAtom);
  // 현재 사용자가 보고 있는 게시글 데이터를 전역 상태에서 가져오기
  const data = useRecoilValue(clickPostItemData);
  // 게시글을 삭제할때 뜨는 모달의 화면 존재 여부 state
  const [isPostDeleteModal, setIsPostDeleteModal] = useState(false);
  // 게시글의 내용을 수정하는 모달의 화면 존재 여부 state
  const [isEditModal, setIsEditModal] = useState(false);
  // 현재 게시글의 데이터를 저장하고 있는 state
  // const [detailData, setDetailData] = useState(data);
  // 신고하기 모달의 화면 존재 여부
  const [isReportModal, setIsReportModal] = useState(false);
  // 사용자가 올린 게시글의 사진의 개수가 한개 이상일때 화면에 보여지는 px 을 저장하는 state
  const [detailImgBoxPx, setDetailImgBoxPx] = useState(0);

  // 서버에게 현재 사용자가 보고 있는 게시글의 데이터를 요청해서 받아오는 함수
  const getDetailData = useCallback(async () => {
    try {
      const docRef = doc(dbService, "test", data.id);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (e) {
      console.log(e);
    }
  }, [data.id]);
  // 서버에 데이터를 요청하는 쿼리
  const { data: detailData } = useQuery(["detailData"], getDetailData);

  // 사용자가 올린 게시글의 사진의 개수글 가지고 이미지가 보여지는 화면의 최대 width px 을 계산하여 그 값을 저장하는 변수
  const imgsMaxPx =
    detailData &&
    detailData.uploadImgUrl !== "" &&
    detailData.uploadImgUrl.length > 0 &&
    detailData.uploadImgUrl.length * 800;
  // 이미지 보기에서 왼쪽 화살표를 클릭하면 호출되는 콜백함수
  const onclickPrevBtn = () => {
    if (detailImgBoxPx < 0) setDetailImgBoxPx((prev) => prev + 800);
  };
  // 이미지 보기에서 오른쪽 화살표를 클릭하면 호출되는 콜백함수
  const onclickNextBtn = () => {
    if (detailImgBoxPx > -imgsMaxPx) setDetailImgBoxPx((prev) => prev - 800);
  };

  // 현재 사용자가 게시글을 보는 기준 시간에서 게시글이 게시된 시간부터 얼마나 지났는지 시간을 계산하는 함수
  const calculateTime = (data) => {
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
  const onclickDeleteBtn = useCallback(() => {
    document.body.style.overflow = "hidden";
    setIsPostDeleteModal((prev) => !prev);
  }, []);

  // 게시글 수정 버튼을 클릭하면 호출되는 콜백함수
  const onclickEditBtn = useCallback(() => {
    setIsEditModal((prev) => !prev);
    document.body.style.overflow = "hidden";
  }, []);

  // 신고 버튼을 클릭하면 호출되는 콜백함수
  const onclickReportBtn = useCallback(() => {
    document.body.style.overflow = "hidden";
    setIsReportModal((prev) => !prev);
  }, []);

  // 좋아요 버튼을 클릭하면 호출하는 콜백함수, 서버에 변경 된 정보 업데이트 후 다시 디테일 게시글 데이터 받아오기
  const onclickLike = async () => {
    let newLikeMember;
    // 좋아요하기, 좋아요 취소하기 로직
    if (
      detailData.likeMember.length === 0 ||
      !detailData.likeMember.includes(user.uid)
    ) {
      // 현재 화면에 보여지고 있는 데이터인 detailData 의 likeMember 의 길이가 0 이거나 현재 사용자의 uid 가 likeMember 에 포함되어 있지 않다면
      newLikeMember = [...detailData.likeMember, user.uid];
    } else if (detailData.likeMember.includes(user.uid)) {
      // 현재 화면에 보여지고 있는 데이터인 detailData 의 likeMember 에 현재 사용자 uid 가 포함되어 있다면
      newLikeMember = detailData.likeMember.filter((item) => {
        return item !== user.uid;
      });
    }

    // 새 likeMember 를 이용해서 업데이트
    await updateDoc(doc(dbService, "test", data.id), {
      likeMember: newLikeMember,
      likeNumber: newLikeMember.length,
    });

    // 해당 게시글의 데이터를 업데이트 했으니까 다시 해당 게시글의 데이터를 받아오는 함수 호출
    queryClient.invalidateQueries(["detailData"]);
  };
  // 좋아요 클릭하면 호출되는 쿼리
  const { mutate: clickLike } = useMutation(onclickLike);

  return (
    <>
      <DetailStyle.DetailBack>
        <DetailStyle.DetailBox>
          <DetailStyle.DetailTitleBox>
            <DetailStyle.DetailTitleText>
              <DetailStyle.DetailWriterImgBox>
                {detailData && detailData.writerProfileImg ? (
                  <img src={detailData.writerProfileImg} alt="writerImg" />
                ) : (
                  <span className="material-symbols-outlined">person</span>
                )}
              </DetailStyle.DetailWriterImgBox>
              {detailData && detailData.nickname} 님의 게시물
            </DetailStyle.DetailTitleText>
            <DetailStyle.DetailTitleBoxRight>
              <DetailStyle.DetailBtn
                onClick={clickLike}
                isLike={
                  detailData && user && detailData.likeMember.includes(user.uid)
                }
              >
                <span className="material-symbols-outlined">favorite</span>
                <span>{detailData && detailData.likeNumber}</span>
              </DetailStyle.DetailBtn>
              <DetailStyle.DetailBtnBox>
                {detailData && user && detailData.writer === user.uid && (
                  <>
                    <DetailStyle.DetailBtn
                      onClick={() => onclickDeleteBtn(data)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </DetailStyle.DetailBtn>
                    <DetailStyle.DetailBtn onClick={() => onclickEditBtn(data)}>
                      <span className="material-symbols-outlined">edit</span>
                    </DetailStyle.DetailBtn>
                  </>
                )}
                <DetailStyle.DetailBtn onClick={onclickReportBtn}>
                  <span className="material-symbols-outlined">problem</span>
                </DetailStyle.DetailBtn>
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
          {/* <DetailStyle.DetailTitleBox>자세한 사진</DetailStyle.DetailTitleBox> */}
          {detailData && Array.isArray(detailData.uploadImgUrl) ? (
            <DetailStyle.DetailImgsBox>
              <DetailStyle.ImgsContainer
                detailImgBoxPx={detailImgBoxPx}
                imgsMaxPx={imgsMaxPx}
              >
                {detailData &&
                  detailData.uploadImgUrl.map((item, index) => {
                    return <img key={index} src={item} alt="게시글 이미지" />;
                  })}
              </DetailStyle.ImgsContainer>
              <DetailStyle.DetailImgPrevBtn
                onClick={onclickPrevBtn}
                detailImgBoxPx={detailImgBoxPx}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </DetailStyle.DetailImgPrevBtn>
              <DetailStyle.DetailImgNextBtn
                onClick={onclickNextBtn}
                detailImgBoxPx={detailImgBoxPx}
                imgsMaxPx={imgsMaxPx}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </DetailStyle.DetailImgNextBtn>
            </DetailStyle.DetailImgsBox>
          ) : (
            <DetailStyle.DetailImgBox>
              <img
                src={detailData && detailData.uploadImgUrl}
                alt="게시글 이미지"
              />
            </DetailStyle.DetailImgBox>
          )}

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
              getDetailData={getDetailData}
            />
          )}
        </DetailStyle.DetailBox>
      </DetailStyle.DetailBack>
      {isPostDeleteModal && (
        <PostDeleteModal
          setIsPostDeleteModal={setIsPostDeleteModal}
          postDeleteData={data}
        />
      )}
      {isEditModal && (
        <EditModal setIsEditModal={setIsEditModal} editData={data}></EditModal>
      )}
      {isReportModal && (
        <ReportModal
          setIsReportModal={setIsReportModal}
          postWriter={data.nickname}
          postName={data.postName}
        />
      )}
    </>
  );
};

export default Detail;
