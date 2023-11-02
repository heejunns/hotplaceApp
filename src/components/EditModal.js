import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { dbService } from "../reactfbase";

const EditModalBack = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
`;
const EditModalBox = styled.div`
  width: 300px;
  height: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 3px solid black;
  background-color: white;
  border-radius: 10px;
`;
const EditModalText = styled.span`
  font-size: 20px;
  margin-bottom: 10px;
`;
const EditModalInputText = styled.textarea`
  width: 100%;
  height: 130px;
  border: 3px solid #a0a0a0;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  resize: none;
`;
const EditModalForm = styled.form``;
const EditModalBtnBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
`;
const EditModalBtn = styled.button`
  width: 80px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
`;
const EditModalCancelBtn = styled(EditModalBtn)`
  background-color: #a0a0a0;
  color: white;
`;
const EditModalConfirmBtn = styled(EditModalBtn)`
  background-color: black;
  color: white;
`;

const EditModal = ({ setIsEditModal, editData }) => {
  const [inputText, setInputText] = useState("");
  const onchangeInputText = (e) => {
    const { value } = e.target;
    setInputText(value);
  };
  const cancelBtnClick = () => {
    setIsEditModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  const confirmBtnClick = async (e) => {
    try {
      e.preventDefault();
      setInputText("");
      setIsEditModal((prev) => !prev);
      await updateDoc(doc(dbService, "test", editData.id), {
        inputText: inputText,
      }); // 데이터 베이스 업데이트
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <EditModalBack>
      <EditModalBox>
        <EditModalText>게시글 수정</EditModalText>
        <EditModalForm>
          <EditModalInputText value={inputText} onChange={onchangeInputText} />
          <EditModalBtnBox>
            <EditModalCancelBtn onClick={cancelBtnClick}>
              취소
            </EditModalCancelBtn>
            <EditModalConfirmBtn onClick={confirmBtnClick}>
              확인
            </EditModalConfirmBtn>
          </EditModalBtnBox>
        </EditModalForm>
      </EditModalBox>
    </EditModalBack>
  );
};

export default EditModal;
