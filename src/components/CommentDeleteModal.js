import React from "react";
import * as DeleteModalStyle from "../styles/componenet/DeleteModalStyle";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../reactfbase";
const CommentDeleteModal = ({
  setIsCommentDeleteModal,
  data,
  commentInfo,
  getDetailData,
  dataId,
}) => {
  const cancelBtnClick = () => {
    setIsCommentDeleteModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  const confirmBtnClick = async () => {
    try {
      setIsCommentDeleteModal((prev) => !prev);
      document.body.style.overflow = "";
      const newComments = data.comments.filter((comment) => {
        // 클릭한 댓글을 필터로 가려내기 클릭하지 않은 댓글만 리턴
        return comment.comment_id !== commentInfo.comment_id;
      });
      await updateDoc(doc(dbService, "test", dataId), {
        // 새로운 comment 정보 업데이트
        comments: newComments,
      });
      getDetailData();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <DeleteModalStyle.DeleteModalBack>
      <DeleteModalStyle.DeleteModalBox>
        <DeleteModalStyle.DeleteModalText>
          댓글을 삭제 하시겠습니까?
        </DeleteModalStyle.DeleteModalText>
        <DeleteModalStyle.DeleteModalBtnBox>
          <DeleteModalStyle.DeleteModalCancelBtn onClick={cancelBtnClick}>
            취소
          </DeleteModalStyle.DeleteModalCancelBtn>
          <DeleteModalStyle.DeleteModalConfirmBtn onClick={confirmBtnClick}>
            삭제
          </DeleteModalStyle.DeleteModalConfirmBtn>
        </DeleteModalStyle.DeleteModalBtnBox>
      </DeleteModalStyle.DeleteModalBox>
    </DeleteModalStyle.DeleteModalBack>
  );
};

export default CommentDeleteModal;
