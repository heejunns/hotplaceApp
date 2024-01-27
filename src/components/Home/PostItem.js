import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as PostItemStyle from "../../styles/componenet/Home/PostItemStyle";
import { useNavigate } from "react-router-dom";
import NoUserClickModal from "../NoUserClickModal";
import { clickPostItemData, userAtom } from "../../recoils/UserAtom";

// 각각의 게시글

const PostItem = ({ data }) => {
  const user = useRecoilValue(userAtom);
  const [clickPostItem, setClickPostItem] = useRecoilState(clickPostItemData);
  const [isNoUserClickModal, setIsNoUserClickModal] = useState(false);
  const navigator = useNavigate();
  // 게시글을 클릭하면 해당 게시글의 디테일 페이지로 이동
  const onClickPostItem = (data) => {
    if (user === null) {
      document.body.style.overflow = "hidden";
      setIsNoUserClickModal((prev) => !prev);
      return;
    }
    setClickPostItem(data);
    navigator("/detail");
  };
  const calculateTime = (data) => {
    // 게시글을 올린지 얼마나 지났는지 시간을 계산하는 함수
    // 게시글이 현재 사용자가 보는 시점에서 얼마나 지났는지 표현하는 표현법은 지금, 시간, 분, 일, 달 입니다.
    // 년은 추후에 추가 할 예정

    const min = (Date.now() - data.createTime) / 1000 / 60;
    // 현재 시점에서 게시글이 생성된 시점을 뺀 밀리초를 분으로 계산
    const minute = Math.round(min);
    const hour = Math.round(minute / 60);
    const day = Math.round(minute / 60 / 24);
    const month = Math.round(minute / 60 / 24 / 30);
    const year = Math.round(minute / 60 / 24 / 30 / 12);
    // round 함수를 사용한 이유는 대략 값을 잡기 위해서 사용
    if (minute < 60) {
      // minute 가 60 보다 작으면 분으로 표현, 단 0 이라면 지금으로 표현
      return minute === 0 ? "지금" : `${minute} 분 전`;
    } else if (hour < 24) {
      // hour 가 24 보다 작으면 시간으로 표현
      return `${hour} 시간 전`;
    } else if (day < 31) {
      // day 가 31 보다 작으면 일로 표현 대략 한달을 30일로 기준을 정함
      return `${day} 일 전`;
    } else if (month < 13) {
      // month 13 보다 작으면 달로 표현
      return `${month}달 전`;
    } else {
      // 일단 나머지는 년으로 표현
      return `${year}년 전`;
    }
  };
  return (
    <>
      <PostItemStyle.PostItemContainer
        image={data.getUploadFileURL}
        onClick={() => onClickPostItem(data)}
      >
        {data.uploadImgUrl && (
          <PostItemStyle.PostItemImg>
            <img src={data.uploadImgUrl} alt="사진 업로드" />
          </PostItemStyle.PostItemImg>
        )}
        <PostItemStyle.PostItemName>{data.postName}</PostItemStyle.PostItemName>
        <PostItemStyle.PostItemInfoBox>
          <PostItemStyle.PostItemLike>
            <span className="material-symbols-outlined">favorite</span>
            <span>{data.likeMember.length}</span>
          </PostItemStyle.PostItemLike>
          <div>
            <PostItemStyle.PostItemTime>
              {calculateTime(data)}
            </PostItemStyle.PostItemTime>
          </div>
        </PostItemStyle.PostItemInfoBox>
      </PostItemStyle.PostItemContainer>
      {isNoUserClickModal && (
        <NoUserClickModal setIsNoUserClickModal={setIsNoUserClickModal} />
      )}
    </>
  );
};

export default PostItem;
