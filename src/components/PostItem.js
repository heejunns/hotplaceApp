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

// word-break: break-all;
const PostItem = ({ data, index, dataLen }) => {
  const user = useRecoilValue(userAtom);
  console.log(user);
  const [inputNewText, setInputNewText] = useState(data.inputText); // 닉네임을 변경하는 값의 state
  const [editingMode, setEditngMode] = useState(false); // 게시글 수정 모드를 사용하고 있는지 여부 state
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
  const onclickDeleteButton = useCallback(async () => {
    try {
      await deleteDoc(doc(dbService, "test", data.id));
      if (data.getUploadFileURL !== "") {
        await deleteObject(ref(storageService, data.getUploadFileURL));
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [data.id, data.getUploadFileURL]);

  // 게시글 수정 폼을 화면에 보여주고 안보여주고 해주는 함수, 게시글 수정 버튼을 클릭하면 호출하는 콜백함수
  const onclickToggleAditButton = useCallback(() => {
    setEditngMode((prev) => !prev);
    setCommentMode(false);
    setMapMode(false);
  }, []);

  // 게시물을 수정하고 버튼을 클릭하였을때 호출
  const onsubmitAdit = useCallback(
    async (e) => {
      e.preventDefault();

      await updateDoc(doc(dbService, "test", data.id), {
        inputText: inputNewText,
      }); // 데이터 베이스 업데이트

      setEditngMode((prev) => !prev);
      setInputNewText("");
    },
    [data.id, inputNewText]
  );

  // 지도보기 버튼을 클릭하면 호출
  const onclickMapButton = useCallback(() => {
    setMapMode((prev) => !prev);
    setCommentMode(false);
    setEditngMode(false);
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
    setEditngMode(false); // 게시글 수정 모드 닫기
    setMapMode(false); // 맵 모드 닫기
  }, []);

  return (
    <PostItemStyle.PostItemBack
      image={data.getUploadFileURL}
      index={index}
      dataLen={dataLen}
    >
      <PostItemStyle.PostItemBox>
        <PostItemStyle.PostItemNickname>
          {data.nickname} 님의 게시글
        </PostItemStyle.PostItemNickname>
        <PostItemStyle.PostItemTime>
          {" "}
          {Math.round((Date.now() - data.createTime) / 1000 / 60) < 60
            ? `약 ${Math.round(
                (Date.now() - data.createTime) / 1000 / 60
              )} 분 전`
            : Math.round((Date.now() - data.createTime) / 1000 / 60) > 59 &&
              Math.round((Date.now() - data.createTime) / 1000 / 60 / 60) < 24
            ? `약 ${Math.round(
                (Date.now() - data.createTime) / 1000 / 60 / 60
              )} 시간 전`
            : Math.round((Date.now() - data.createTime) / 1000 / 60 / 60) >
                23 &&
              Math.round((Date.now() - data.createTime) / 1000 / 60 / 60 / 24) <
                30
            ? `약 ${Math.round(
                (Date.now() - data.createTime) / 1000 / 60 / 60 / 24
              )} 일 전`
            : "한달이 넘음"}
        </PostItemStyle.PostItemTime>
        <PostItemStyle.PostItemCategory>
          {" "}
          {data.userSelectCategory === "food"
            ? "음식"
            : data.userSelectCategory === "cafe"
            ? "카페"
            : data.userSelectCategory === "mart"
            ? "마트"
            : null}
          /
        </PostItemStyle.PostItemCategory>

        {data.getUploadFileURL && (
          <PostItemStyle.PostItemImg
            src={data.getUploadFileURL}
            alt="사진 업로드"
          />
        )}
        <PostItemStyle.PostItemText>
          {data.inputText}
        </PostItemStyle.PostItemText>
      </PostItemStyle.PostItemBox>
      <PostItemStyle.PostBtnBox>
        {data.writer === user.uid ? (
          <>
            <PostItemStyle.PostItemBtn onClick={onclickDeleteButton}>
              <i class="fa-solid fa-trash"></i>
            </PostItemStyle.PostItemBtn>
            <PostItemStyle.PostItemBtn onClick={onclickToggleAditButton}>
              <i class="fa-solid fa-pen"></i>
            </PostItemStyle.PostItemBtn>
            {data.userMarkerLocation.length !== 0 && (
              <PostItemStyle.PostItemBtn onClick={onclickMapButton}>
                <i class="fa-solid fa-location-dot"></i>
              </PostItemStyle.PostItemBtn>
            )}
            <PostItemStyle.PostItemBtn onClick={onclickComments}>
              <i class="fa-regular fa-comment"></i>
            </PostItemStyle.PostItemBtn>
          </>
        ) : (
          <>
            {data.userMarkerLocation.length !== 0 && (
              <PostItemStyle.PostItemBtn onClick={onclickMapButton}>
                {" "}
                <i class="fa-solid fa-location-dot"></i>
              </PostItemStyle.PostItemBtn>
            )}
            <PostItemStyle.PostItemBtn onClick={onclickComments}>
              {" "}
              <i class="fa-regular fa-comment"></i>
            </PostItemStyle.PostItemBtn>
          </>
        )}
      </PostItemStyle.PostBtnBox>
      {editingMode ? (
        <>
          <PostItemStyle.PostItemEditForm onSubmit={onsubmitAdit}>
            <PostItemStyle.PostItemEditInput
              type="text"
              value={inputNewText}
              onChange={onchangeAditText}
              placeholder="게시물의 수정 사항을 작성해주세요."
            />
            <PostItemStyle.PostItemEditSubmit type="submit" value="수정 완료" />
          </PostItemStyle.PostItemEditForm>
        </>
      ) : null}
      {mapMode && <PostMap data={data} />}
      {commentMode && <Comments setCommentMode={setCommentMode} data={data} />}
      <PostItemStyle.PostItemLike onClick={onclickLike}>
        &#9829;<span>{data.likeMember.length}</span>
      </PostItemStyle.PostItemLike>
    </PostItemStyle.PostItemBack>
  );
};

export default PostItem;
