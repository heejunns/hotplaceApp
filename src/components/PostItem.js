import React, { useCallback, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../reactfbase";
import { deleteObject, ref } from "firebase/storage";
import styled from "styled-components";
import PostMap from "./PostMap";
import Comments from "./Comments";
import { useRecoilState, useRecoilValue } from "recoil";
import { clickPostItemData, userAtom } from "../recoils/UserAtom";
import * as PostItemStyle from "../styles/PostItemStyle";
import EditModal from "./EditModal";
import DeleteModal from "./PostDeleteModal";
import { useNavigate } from "react-router-dom";

// word-break: break-all;
const PostItem = ({ data, index, dataLen }) => {
  const user = useRecoilValue(userAtom);
  const [clickPostItem, setClickPostItem] = useRecoilState(clickPostItemData);
  const navigator = useNavigate();

  // 좋아요 버튼을 클릭하면 호출
  const onclickLike = useCallback(async () => {
    if (data.likeMember.length === 0) {
      // likeMember 에 아무도 없다면
      await updateDoc(doc(dbService, "test", data.id), {
        likeMember: [user.uid], // 좋아요 누른 사람 현재 사용자 uid 저장
        likeNumber: 1, // 좋아요 누른 사람 한명
      });
    } else if (data.likeMember.includes(user.uid)) {
      // likeMember 에 현재 사용자 uid 가 있다면 이미 좋아요를 눌렀는데 또 누르는 거니까 좋아요 취소
      const newLikeMember = data.likeMember.filter(
        // 현재 사용자 uid 와 같지 않은 새로운 likeMember 생성
        (element) => element !== user.uid
      );
      await updateDoc(doc(dbService, "test", data.id), {
        likeMember: newLikeMember, // 새로운 likMember 저장
        likeNumber: newLikeMember.length, // 새로운 likeMember 의 길이를 저장, 좋아요 누른 사람의 수
      });
    } else if (!data.likeMember.includes(user.uid)) {
      // likeMember 에 사용자의 uid 가 없다면 좋아요를 누르지 않았다는 뜻 이니까 좋아요 수 증가
      await updateDoc(doc(dbService, "test", data.id), {
        likeMember: [...data.likeMember, user.uid], // 기존의 likeMember 에 현재 사용자의 uid 추가
        likeNumber: [...data.likeMember, user.uid].length, // 추가한 likeMember 의 길이 저장
      });
    }
  }, [data.id, data.likeMember, user.uid]);

  // 게시글을 클릭하면 해당 게시글의 디테일 페이지로 이동
  const onClickPostItem = (data) => {
    setClickPostItem(data);
    navigator("/detail");
  };
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
      return `${Math.round(minute / 60 / 24)} 일 전`;
    } else if (Math.round(minute / 60 / 24) > 30) {
      return "한달 전";
    }
  };
  return (
    <>
      <PostItemStyle.PostItemBack
        image={data.getUploadFileURL}
        onClick={() => onClickPostItem(data)}
      >
        <PostItemStyle.PostItemTitleBox>
          <PostItemStyle.PostItemNickname>
            {data.nickname} 님
          </PostItemStyle.PostItemNickname>
          <div>
            <PostItemStyle.PostItemTime>
              {calculateTime(data)}/
            </PostItemStyle.PostItemTime>
            <PostItemStyle.PostItemCategory>
              {data.category}
            </PostItemStyle.PostItemCategory>
          </div>
        </PostItemStyle.PostItemTitleBox>

        {data.uploadImgUrl && (
          <PostItemStyle.PostItemImgBox>
            <img src={data.uploadImgUrl} alt="사진 업로드" />
          </PostItemStyle.PostItemImgBox>
        )}
        <PostItemStyle.PostItemText>
          {data.inputText}
        </PostItemStyle.PostItemText>

        {/* {mapMode && <PostMap data={data} />}
        {commentMode && (
          <Comments setCommentMode={setCommentMode} data={data} />
        )} */}
        <PostItemStyle.PostItemLike onClick={onclickLike}>
          &#9829;<span>{data.likeMember.length}</span>
        </PostItemStyle.PostItemLike>
      </PostItemStyle.PostItemBack>
    </>
  );
};

export default PostItem;
