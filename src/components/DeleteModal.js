import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import styled from "styled-components";
import { dbService, storageService } from "../reactfbase";
import { deleteObject, ref } from "firebase/storage";

const DeleteModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const DeleteModalBox = styled.div`
  background-color: white;
  padding: 20px;
  width: 280px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid mediumorchid;
  border-radius: 10px;
`;
const DeleteModalText = styled.span`
  font-size: 20px;
`;
const DeleteModalBtnBox = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;
const DeleteModalBtn = styled.button`
  width: 80px;
  height: 35px;
  border: 3px solid mediumorchid;
  border-radius: 10px;
  font-size: 15px;
  background-color: transparent;
`;
const DeleteModalCancelBtn = styled(DeleteModalBtn)`
  &:hover {
    background-color: red;
    color: white;
  }
`;
const DeleteModalConfirmBtn = styled(DeleteModalBtn)`
  &:hover {
    background-color: greenyellow;
  }
`;
const DeleteModal = ({ setIsDeleteModal, deleteData }) => {
  const cancelBtnClick = () => {
    setIsDeleteModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  const confirmBtnClick = async () => {
    setIsDeleteModal((prev) => !prev);
    document.body.style.overflow = "";
    try {
      await deleteDoc(doc(dbService, "test", deleteData.id));
      if (deleteData.getUploadFileURL !== "") {
        await deleteObject(ref(storageService, deleteData.getUploadFileURL));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <DeleteModalBackground>
      <DeleteModalBox>
        <DeleteModalText>게시글을 삭제 하시겠습니까?</DeleteModalText>
        <DeleteModalBtnBox>
          <DeleteModalCancelBtn onClick={cancelBtnClick}>
            취소
          </DeleteModalCancelBtn>
          <DeleteModalConfirmBtn onClick={confirmBtnClick}>
            삭제
          </DeleteModalConfirmBtn>
        </DeleteModalBtnBox>
      </DeleteModalBox>
    </DeleteModalBackground>
  );
};

export default DeleteModal;
