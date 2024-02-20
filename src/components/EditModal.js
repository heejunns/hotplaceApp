import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { dbService } from "../reactfbase";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as S from "../styles/components/EditModal.style";

const EditModal = ({ setIsEditModal, editData }) => {
  const queryClient = useQueryClient();
  const [inputText, setInputText] = useState("");
  const onchangeInputText = (e) => {
    const { value } = e.target;
    setInputText(value);
  };
  const onclickEditCancelBtn = () => {
    setIsEditModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  const onclickEditConfirmBtn = async (e) => {
    try {
      e.preventDefault();
      setInputText("");
      setIsEditModal((prev) => !prev);
      document.body.style.overflow = "";
      await updateDoc(doc(dbService, "test", editData.id), {
        inputText: inputText,
      }); // 데이터 베이스 업데이트
    } catch (e) {
      console.log(e);
    }
  };

  const { mutate: clickEditConfirm, isLoading: editConfirmIsLoading } =
    useMutation({
      queryFn: onclickEditConfirmBtn,
      onSuccess: () => {
        queryClient.invalidateQueries(["detailData"]);
      },
    });
  return (
    <>
      <S.EditModalBack>
        <S.EditModalBox>
          <S.EditModalText>게시글 수정</S.EditModalText>
          <S.EditModalForm>
            <S.EditModalInputText
              value={inputText}
              onChange={onchangeInputText}
            />
            <S.EditModalBtnBox>
              <S.EditModalCancelBtn onClick={onclickEditCancelBtn}>
                취소
              </S.EditModalCancelBtn>
              <S.EditModalConfirmBtn onClick={clickEditConfirm}>
                확인
              </S.EditModalConfirmBtn>
            </S.EditModalBtnBox>
          </S.EditModalForm>
        </S.EditModalBox>
      </S.EditModalBack>
      {editConfirmIsLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default EditModal;
