import React, { useCallback, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../reactfbase";
import { deleteObject, ref } from "firebase/storage";
import styled from "styled-components";
import PostMap from "./PostMap";
import Comments from "./Comments";
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoils/UserAtom";
import * as PostItemStyle from "../styles/PostItemStyle";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

// word-break: break-all;
const PostItem = ({ data, index, dataLen }) => {
  const user = useRecoilValue(userAtom);
  console.log(user);

  const [inputNewText, setInputNewText] = useState(data.inputText); // 닉네임을 변경하는 값의 state
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false); // 게시글 수정 모드를 사용하고 있는지 여부 state
  const [editData, setEditData] = useState(null);
  const [mapMode, setMapMode] = useState(false); // 맵을 보는지 여부 state
  const [commentMode, setCommentMode] = useState(false); // 댓글 모드 여부 state

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

  // 지도보기 버튼을 클릭하면 호출
  const onclickMapButton = useCallback(() => {
    setMapMode((prev) => !prev);
    setCommentMode(false);
  }, []);
  // 하트를 클릭하면 호출

  // 좋아요 버튼을 클릭하면 호출
  const onclickLike = useCallback(async () => {
    if (data.likeMember.length === 0) {
      // likeMember 에 아무도 없다면
      await updateDoc(doc(dbService, "test", data.id), {
        likeMember: [user.uid], // 좋아요 누른 사람 현재 사용자 uid 저장
        likeNumber: 1, // 좋아요 누른 사람 한명
      });
    } else if (data.likeMember.some((element) => element === user.uid)) {
      // likeMember 에 현재 사용자 uid 가 있다면 이미 좋아요를 눌렀는데 또 누르는 거니까 좋아요 취소
      const newLikeMember = data.likeMember.filter(
        // 현재 사용자 uid 를 빼고 새로운 likeMember 생성
        (element) => element !== user.uid
      );
      await updateDoc(doc(dbService, "test", data.id), {
        likeMember: newLikeMember, // 새로운 likMember 저장
        likeNumber: newLikeMember.length, // 새로운 likeMember 의 길이를 저장, 좋아요 누른 사람의 수
      });
    } else if (!data.likeMember.some((element) => element === user.uid)) {
      // likeMember 에 사용자의 uid 가 없다면 좋아요를 누르지 않았다는 거니까 좋아요 눌러서 좋아요를 누른 사람 증가
      await updateDoc(doc(dbService, "test", data.id), {
        likeMember: [...data.likeMember, user.uid], // 기존의 likeMember 에 현재 사용자의 uid 추가
        likeNumber: [...data.likeMember, user.uid].length, // 추가한 likeMember 의 길이 저장
      });
    }
  }, [data.id, data.likeMember, user.uid]);
  // 댓글 달기 버튼 클릭하면 호출
  const onclickComments = useCallback(() => {
    setCommentMode((prev) => !prev); // 댓글 기능 열기
    setMapMode(false); // 맵 모드 닫기
  }, []);

  return (
    <>
      <PostItemStyle.PostItemBack image={data.getUploadFileURL}>
        <PostItemStyle.PostItemTitleBox>
          <PostItemStyle.PostItemNickname>
            {data.nickname} 님
          </PostItemStyle.PostItemNickname>
          <div>
            <PostItemStyle.PostItemTime>
              {" "}
              {Math.round((Date.now() - data.createTime) / 1000 / 60) < 60
                ? `${Math.round(
                    (Date.now() - data.createTime) / 1000 / 60
                  )} 분 전 `
                : Math.round((Date.now() - data.createTime) / 1000 / 60) > 59 &&
                  Math.round((Date.now() - data.createTime) / 1000 / 60 / 60) <
                    24
                ? `${Math.round(
                    (Date.now() - data.createTime) / 1000 / 60 / 60
                  )} 시간 전  `
                : Math.round((Date.now() - data.createTime) / 1000 / 60 / 60) >
                    23 &&
                  Math.round(
                    (Date.now() - data.createTime) / 1000 / 60 / 60 / 24
                  ) < 30
                ? `${Math.round(
                    (Date.now() - data.createTime) / 1000 / 60 / 60 / 24
                  )} 일 전 `
                : "한달이 넘음 "}
              /
            </PostItemStyle.PostItemTime>
            <PostItemStyle.PostItemCategory>
              {data.userSelectCategory === "food"
                ? "음식"
                : data.userSelectCategory === "cafe"
                ? "카페"
                : data.userSelectCategory === "mart"
                ? "마트"
                : null}
            </PostItemStyle.PostItemCategory>
          </div>
        </PostItemStyle.PostItemTitleBox>

        {data.getUploadFileURL && (
          <PostItemStyle.PostItemImgBox>
            <img src={data.getUploadFileURL} alt="사진 업로드" />
          </PostItemStyle.PostItemImgBox>
        )}
        <PostItemStyle.PostItemText>
          {data.inputText}
        </PostItemStyle.PostItemText>
        <PostItemStyle.PostBtnBox>
          {data.writer === user.uid ? (
            <>
              <PostItemStyle.PostItemBtn
                onClick={() => onclickDeleteButton(data)}
              >
                <span class="material-symbols-outlined">delete</span>
              </PostItemStyle.PostItemBtn>
              <PostItemStyle.PostItemBtn
                onClick={() => onclickEditButton(data)}
              >
                <span class="material-symbols-outlined">edit</span>
              </PostItemStyle.PostItemBtn>
              {data.userMarkerLocation.length !== 0 && (
                <PostItemStyle.PostItemBtn onClick={onclickMapButton}>
                  <span class="material-symbols-outlined">location_on</span>
                </PostItemStyle.PostItemBtn>
              )}
              <PostItemStyle.PostItemBtn onClick={onclickComments}>
                <span class="material-symbols-outlined">add_comment</span>
              </PostItemStyle.PostItemBtn>
            </>
          ) : (
            <>
              {data.userMarkerLocation.length !== 0 && (
                <PostItemStyle.PostItemBtn onClick={onclickMapButton}>
                  {" "}
                  <span class="material-symbols-outlined">location_on</span>
                </PostItemStyle.PostItemBtn>
              )}
              <PostItemStyle.PostItemBtn onClick={onclickComments}>
                {" "}
                <span class="material-symbols-outlined">add_comment</span>
              </PostItemStyle.PostItemBtn>
            </>
          )}
        </PostItemStyle.PostBtnBox>

        {mapMode && <PostMap data={data} />}
        {commentMode && (
          <Comments setCommentMode={setCommentMode} data={data} />
        )}
        <PostItemStyle.PostItemLike onClick={onclickLike}>
          &#9829;<span>{data.likeMember.length}</span>
        </PostItemStyle.PostItemLike>
      </PostItemStyle.PostItemBack>
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

export default PostItem;
