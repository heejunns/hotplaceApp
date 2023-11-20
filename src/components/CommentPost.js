import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { dbService } from "../reactfbase";
import { userAtom } from "../recoils/UserAtom";
import { useRecoilValue } from "recoil";
import CommentDeleteModal from "./CommentDeleteModal";
import * as CommentPostStyle from "../styles/componenet/CommentPostStyle";
import { useMutation, useQueryClient } from "react-query";
const CommentPost = ({ commentInfo, data, dataId, getDetailData }) => {
  const queryClient = useQueryClient();
  const user = useRecoilValue(userAtom);
  // 댓글에서 좋아요 버튼을 클릭하면 호출
  const [isCommentDeleteModal, setIsCommentDeleteModal] = useState(false);
  const onclickLikeButton = async () => {
    const newComments = data.comments.map((comment) => {
      if (comment.comment_id === commentInfo.comment_id) {
        // 기존의 comments 데이터 중에 comment_id 와 CommentPost 를 구성하는 commentInfo 의 comment_id 가 같으면
        if (comment.commentLikeMember.length === 0) {
          // comment 객체 안의 commentLikeMember 의 길이가 0 이라면 아직 좋아요를 누른 사람이 아무도 없다는 뜻 이니까
          return {
            ...comment, // 기존의 comment 객체의 값들은 그대로 다시 저장
            commentLikeMember: [user.uid], // commentLikeMember 의 값에서는 현재 사용자의 uid 를 저장
          };
        } else if (
          comment.commentLikeMember.includes(user.uid) // commentLikeMember 중에서 현재 사용중인 uid 와 같은 요소가 있다면 true 이니까
        ) {
          // 현재 좋아요를 클릭한 사용자의 정보는 commentLikeMember 에서 삭제하고 새로운 commentLikeMember 을 만들어서
          const newCommentLikeMember = comment.commentLikeMember.filter(
            (element) => element !== user.uid
          );
          return {
            ...comment,
            commentLikeMember: newCommentLikeMember, // 새로운 commentLikeMember 저장
          };
        } else if (
          !comment.commentLikeMember.includes(user.uid) // false 가 나온다면 기존의 commentLikeMember 에 현재 사용자의 uid 가 없다는 뜻이니까
        ) {
          return {
            ...comment,
            commentLikeMember: [...comment.commentLikeMember, user.uid], // 기존의 commentLikeMember 의 정보애 현재 좋아요를 클릭한 uid 추가
          };
        }
      } else {
        return comment;
      }
    });
    await updateDoc(doc(dbService, "test", dataId), {
      // comment 에 새로운 comment 정보 업데이트
      comments: newComments,
    });
  };

  const { mutate: likeBtnClick } = useMutation(onclickLikeButton, {
    onSuccess: () => {
      queryClient.invalidateQueries(["detailData"]);
    },
  });
  const onclickDeleteCommentButton = async () => {
    // 삭제 버튼 클릭
    document.body.style.overflow = "hidden";
    setIsCommentDeleteModal((prev) => !prev);
  };

  // 게시글 게시 시간이 얼마나 지났는지 계산하는 함수
  const calculateTime = (data) => {
    const minute = (Date.now() - data.commentCreateTime) / 1000 / 60;
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
      <CommentPostStyle.CommentItemBox>
        <CommentPostStyle.CommentDelete onClick={onclickDeleteCommentButton}>
          {user && user.displayName === commentInfo.commentWriter && (
            <span className="material-symbols-outlined">delete</span>
          )}
        </CommentPostStyle.CommentDelete>
        <CommentPostStyle.CommentWriter>
          {commentInfo.commentWriter} / {calculateTime(commentInfo)}
        </CommentPostStyle.CommentWriter>
        <CommentPostStyle.CommentValue>
          {commentInfo.commentValue}
        </CommentPostStyle.CommentValue>
        <CommentPostStyle.CommentLike
          onClick={likeBtnClick}
          isLike={user && commentInfo.commentLikeMember.includes(user.uid)}
        >
          <span className="material-symbols-outlined">favorite</span>
          {commentInfo.commentLikeMember.length}
        </CommentPostStyle.CommentLike>
      </CommentPostStyle.CommentItemBox>
      {isCommentDeleteModal && (
        <CommentDeleteModal
          setIsCommentDeleteModal={setIsCommentDeleteModal}
          data={data}
          dataId={dataId}
          getDetailData={getDetailData}
          commentInfo={commentInfo}
        />
      )}
    </>
  );
};

export default CommentPost;
