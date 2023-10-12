import React, { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { clickPostItemData, userAtom } from "../recoils/UserAtom";
import * as TopPostItemStyle from "../styles/componenet/TopPostItemStyle";
import { useNavigate } from "react-router-dom";
// word-break: break-all;
const TopPostItem = ({ data, index, dataLen }) => {
  const user = useRecoilValue(userAtom);
  const [clickPostItem, setClickPostItem] = useRecoilState(clickPostItemData);
  const navigator = useNavigate();
  // 게시글을 클릭하면 해당 게시글의 디테일 페이지로 이동
  console.log("user", user);
  const onClickTopPostItem = (data) => {
    if (user === null) {
      navigator("/login");
      return;
    }
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
      <TopPostItemStyle.TopPostItemBack
        image={data.getUploadFileURL}
        onClick={() => onClickTopPostItem(data)}
      >
        <TopPostItemStyle.TopPostItemTitleBox>
          <TopPostItemStyle.TopPostItemNickname>
            <span>{data.nickname}</span> 님
          </TopPostItemStyle.TopPostItemNickname>

          <div>
            <TopPostItemStyle.TopPostItemTime>
              {calculateTime(data)}/
            </TopPostItemStyle.TopPostItemTime>
            <TopPostItemStyle.TopPostItemCategory>
              {data.category}
            </TopPostItemStyle.TopPostItemCategory>
          </div>
        </TopPostItemStyle.TopPostItemTitleBox>

        {data.uploadImgUrl && (
          <TopPostItemStyle.TopPostItemImgBox>
            <img src={data.uploadImgUrl} alt="사진 업로드" />
          </TopPostItemStyle.TopPostItemImgBox>
        )}
        <TopPostItemStyle.TopPostItemText>
          {data.inputText}
        </TopPostItemStyle.TopPostItemText>

        {/* {mapMode && <PostMap data={data} />}
        {commentMode && (
          <Comments setCommentMode={setCommentMode} data={data} />
        )} */}
        <TopPostItemStyle.TopPostItemLike>
          &#9829;<span>{data.likeMember.length}</span>
        </TopPostItemStyle.TopPostItemLike>
      </TopPostItemStyle.TopPostItemBack>
    </>
  );
};

export default TopPostItem;
