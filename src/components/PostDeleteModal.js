import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService, storageService } from "../reactfbase";
import { deleteObject, ref } from "firebase/storage";
import * as S from "../styles/components/DeleteModal.style";
import { useNavigate } from "react-router-dom";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import { currentPageAtom } from "../recoils/UserAtom";
import { useMutation } from "@tanstack/react-query";

const PostDeleteModal = ({ setIsPostDeleteModal, postDeleteData }) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const cancelBtnClick = () => {
    setIsPostDeleteModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  const onclickConfirmBtn = async () => {
    console.log("hello");
    try {
      setIsDeleteLoading(true);
      await deleteDoc(doc(dbService, "test", postDeleteData.id));
      // setCurrentPage(0);
      setIsPostDeleteModal((prev) => !prev);
      document.body.style.overflow = "";
      console.log(postDeleteData.getUploadFileURL);
      if (postDeleteData.getUploadFileURL) {
        await deleteObject(
          ref(storageService, postDeleteData.getUploadFileURL)
        );
      }
      setIsDeleteLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // const { mutate: clickConfirmBtn, isLoading: deletePostIsLoading } =
  //   useMutation({ onclickConfirmBtn });

  return (
    <>
      <S.DeleteModalBack>
        <S.DeleteModalBox>
          <S.DeleteModalText>게시글을 삭제 하시겠습니까?</S.DeleteModalText>
          <S.DeleteModalBtnBox>
            <S.DeleteModalCancelBtn onClick={cancelBtnClick}>
              취소
            </S.DeleteModalCancelBtn>
            <S.DeleteModalConfirmBtn onClick={onclickConfirmBtn}>
              삭제
            </S.DeleteModalConfirmBtn>
          </S.DeleteModalBtnBox>
        </S.DeleteModalBox>
      </S.DeleteModalBack>
      {isDeleteLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default PostDeleteModal;
