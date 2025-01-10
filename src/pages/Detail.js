import * as S from "../styles/pages/Detail.style";
import { useRecoilValue } from "recoil";
import { clickPostItemData, userAtom } from "../recoils/UserAtom";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import EditModal from "../components/EditModal";
import Comments from "../components/Comment";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../reactfbase";
import PostDeleteModal from "../components/PostDeleteModal";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// =============================================== 디테일 페이지 ================================================
// 사용자가 게시글을 클릭하면 게시글에대한 자세한 내용을 확인 할 수 있는 페이지 입니다.
// ===========================================================================================================
const Detail = () => {
  // const queryClient = useQueryClient();
  // 현재 로그인중인 사용자의 정보를 전역 상태에서 가져오기
  const user = useRecoilValue(userAtom);
  // 현재 사용자가 보고 있는 게시글 데이터를 전역 상태에서 가져오기
  const data = useRecoilValue(clickPostItemData);
  // 게시글을 삭제할때 뜨는 모달의 화면 존재 여부 state
  const [isPostDeleteModal, setIsPostDeleteModal] = useState(false);
  // 게시글의 내용을 수정하는 모달의 화면 존재 여부 state
  const [isEditModal, setIsEditModal] = useState(false);
  // 현재 게시글의 데이터를 저장하고 있는 state
  const [detailData, setDetailData] = useState(data);
  const [getDataLoading, setGetDataLoading] = useState(false);
  // 사용자가 올린 게시글의 사진의 개수가 한개 이상일때 화면에 보여지는 px 을 저장하는 state
  const [detailImgBoxPx, setDetailImgBoxPx] = useState(0);

  // 서버에게 현재 사용자가 보고 있는 게시글의 데이터를 요청해서 받아오는 함수
  const getDetailData = useCallback(async () => {
    try {
      setGetDataLoading(true);
      const docRef = doc(dbService, "test", data.id);
      const docSnap = await getDoc(docRef);
      setDetailData(docSnap.data());
      setGetDataLoading(false);
      // return docSnap.data();
    } catch (e) {
      console.log(e);
    }
  }, [data.id]);
  // 서버에 데이터를 요청하는 쿼리
  useEffect(() => {
    getDetailData();
  }, []);
  // const { data: detailData, isLoading: getDetailDataIsLoading } = useQuery({
  //   queryKey: ["detailData"],
  //   queryFn: getDetailData,
  // });

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

  // 좋아요 버튼을 클릭하면 호출하는 콜백함수, 서버에 변경 된 정보 업데이트 후 다시 디테일 게시글 데이터 받아오기
  const onclickLike = async () => {
    console.log("hello");
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
    getDetailData();

    // 해당 게시글의 데이터를 업데이트 했으니까 다시 해당 게시글의 데이터를 받아오는 함수 호출
    // queryClient.invalidateQueries(["detailData"]);
  };
  // 좋아요 클릭하면 호출되는 쿼리
  // const { mutate: clickLike } = useMutation({ queryFn: onclickLike });

  return (
    <>
      <S.DetailBack>
        <S.DetailBox>
          <S.DetailTitleBox>
            <S.DetailTitleText>
              <S.DetailWriterImgBox>
                {detailData && detailData.writerProfileImg ? (
                  <img src={detailData.writerProfileImg} alt="writerImg" />
                ) : (
                  <span className="material-symbols-outlined">person</span>
                )}
              </S.DetailWriterImgBox>
              {detailData && detailData.nickname} 님의 게시물
            </S.DetailTitleText>
            <S.DetailTitleBoxRight>
              <S.DetailBtn
                onClick={onclickLike}
                isLike={
                  detailData && user && detailData.likeMember.includes(user.uid)
                }
              >
                <span className="material-symbols-outlined">favorite</span>
                <span>{detailData && detailData.likeNumber}</span>
              </S.DetailBtn>
              <S.DetailBtnBox>
                {detailData && user && detailData.writer === user.uid && (
                  <>
                    <S.DetailBtn onClick={() => onclickDeleteBtn(data)}>
                      <span className="material-symbols-outlined">delete</span>
                    </S.DetailBtn>
                    <S.DetailBtn onClick={() => onclickEditBtn(data)}>
                      <span className="material-symbols-outlined">edit</span>
                    </S.DetailBtn>
                  </>
                )}
              </S.DetailBtnBox>
              <S.DetailTitleText>
                {detailData && calculateTime(detailData)} /
              </S.DetailTitleText>
              <S.DetailTitleText>
                {detailData && detailData.category}
              </S.DetailTitleText>
            </S.DetailTitleBoxRight>
          </S.DetailTitleBox>

          <S.DetailPostNameBox>
            <S.DetailItemTitle>매장 이름</S.DetailItemTitle>
            <S.DetailPostName>
              {detailData && detailData.postName}
            </S.DetailPostName>
          </S.DetailPostNameBox>
          {/* <S.DetailTitleBox>자세한 사진</S.DetailTitleBox> */}
          {detailData && Array.isArray(detailData.uploadImgUrl) ? (
            <S.DetailImgsBox>
              <S.ImgsContainer
                detailImgBoxPx={detailImgBoxPx}
                imgsMaxPx={imgsMaxPx}
              >
                {detailData &&
                  detailData.uploadImgUrl.map((item, index) => {
                    return <img key={index} src={item} alt="게시글 이미지" />;
                  })}
              </S.ImgsContainer>
              <S.DetailImgPrevBtn
                onClick={onclickPrevBtn}
                detailImgBoxPx={detailImgBoxPx}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </S.DetailImgPrevBtn>
              <S.DetailImgNextBtn
                onClick={onclickNextBtn}
                detailImgBoxPx={detailImgBoxPx}
                imgsMaxPx={imgsMaxPx}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </S.DetailImgNextBtn>
            </S.DetailImgsBox>
          ) : (
            <S.DetailImgBox>
              <img
                src={detailData && detailData.uploadImgUrl}
                alt="게시글 이미지"
              />
            </S.DetailImgBox>
          )}

          <S.DetailMainText>
            <S.DetailItemTitle>자세한 내용</S.DetailItemTitle>
            {detailData && detailData.inputText}
          </S.DetailMainText>

          {detailData && (
            <Comments
              dataId={data.id}
              data={detailData}
              getDetailData={getDetailData}
            />
          )}
        </S.DetailBox>
      </S.DetailBack>
      {isPostDeleteModal && (
        <PostDeleteModal
          setIsPostDeleteModal={setIsPostDeleteModal}
          postDeleteData={data}
        />
      )}
      {isEditModal && (
        <EditModal setIsEditModal={setIsEditModal} editData={data}></EditModal>
      )}

      {getDataLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default Detail;
