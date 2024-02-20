import * as S from "../styles/components/DeleteModal.style";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../reactfbase";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const CommentDeleteModal = ({
  setIsCommentDeleteModal,
  data,
  commentInfo,
  dataId,
}) => {
  const queryClient = useQueryClient();
  const cancelBtnClick = () => {
    setIsCommentDeleteModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  const onclickConfirmBtn = async () => {
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
    } catch (e) {
      console.log(e);
    }
  };

  const { mutate: clickConfirmBtn, isLoading: deleteIsLoading } = useMutation({
    queryFn: onclickConfirmBtn,
    onSuccess: () => {
      queryClient.invalidateQueries(["detailData"]);
    },
  });
  return (
    <>
      <S.DeleteModalBack>
        <S.DeleteModalBox>
          <S.DeleteModalText>댓글을 삭제 하시겠습니까?</S.DeleteModalText>
          <S.DeleteModalBtnBox>
            <S.DeleteModalCancelBtn onClick={cancelBtnClick}>
              취소
            </S.DeleteModalCancelBtn>
            <S.DeleteModalConfirmBtn onClick={clickConfirmBtn}>
              삭제
            </S.DeleteModalConfirmBtn>
          </S.DeleteModalBtnBox>
        </S.DeleteModalBox>
      </S.DeleteModalBack>
      {deleteIsLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default CommentDeleteModal;
