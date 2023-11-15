import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { dbService, storageService } from "../reactfbase";
import { deleteObject, ref } from "firebase/storage";
import * as DeleteModalStyle from "../styles/componenet/DeleteModalStyle";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const PostDeleteModal = ({ setIsPostDeleteModal, postDeleteData }) => {
  const navigate = useNavigate();
  const cancelBtnClick = () => {
    setIsPostDeleteModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  const onclickConfirmBtn = async () => {
    try {
      setIsPostDeleteModal((prev) => !prev);
      document.body.style.overflow = "";
      await deleteDoc(doc(dbService, "test", postDeleteData.id));
      navigate("/");
      if (postDeleteData.getUploadFileURL !== "") {
        await deleteObject(
          ref(storageService, postDeleteData.getUploadFileURL)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const { mutate: clickConfirmBtn } = useMutation(onclickConfirmBtn);

  return (
    <>
      <DeleteModalStyle.DeleteModalBack>
        <DeleteModalStyle.DeleteModalBox>
          <DeleteModalStyle.DeleteModalText>
            게시글을 삭제 하시겠습니까?
          </DeleteModalStyle.DeleteModalText>
          <DeleteModalStyle.DeleteModalBtnBox>
            <DeleteModalStyle.DeleteModalCancelBtn onClick={cancelBtnClick}>
              취소
            </DeleteModalStyle.DeleteModalCancelBtn>
            <DeleteModalStyle.DeleteModalConfirmBtn onClick={clickConfirmBtn}>
              삭제
            </DeleteModalStyle.DeleteModalConfirmBtn>
          </DeleteModalStyle.DeleteModalBtnBox>
        </DeleteModalStyle.DeleteModalBox>
      </DeleteModalStyle.DeleteModalBack>
    </>
  );
};

export default PostDeleteModal;
