import React, { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { clickPostItemData, userAtom } from "../recoils/UserAtom";
import * as PostItemStyle from "../styles/componenet/PostItemStyle";
import { useNavigate } from "react-router-dom";
import NoUserClickModal from "./NoUserClickModal";

// word-break: break-all;
const PostItem = ({ data, index, dataLen }) => {
  const user = useRecoilValue(userAtom);
  const [clickPostItem, setClickPostItem] = useRecoilState(clickPostItemData);
  const [isNoUserClickModal, setIsNoUserClickModal] = useState(false);
  const navigator = useNavigate();
  console.log("user", user);
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
          <div>
            <PostItemStyle.PostItemNickname>
              <span>{data.nickname}</span> 님
            </PostItemStyle.PostItemNickname>
            <PostItemStyle.ProfileImg>
              <img
                src={data.nickname === user.displayName && user.photoURL}
                alt="profileImg"
              />
            </PostItemStyle.ProfileImg>
          </div>

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
        <PostItemStyle.PostItemLike>
          &#9829;<span>{data.likeMember.length}</span>
        </PostItemStyle.PostItemLike>
      </PostItemStyle.PostItemBack>
      {isNoUserClickModal && (
        <NoUserClickModal setIsNoUserClickModal={setIsNoUserClickModal} />
      )}
    </>
  );
};

export default PostItem;
