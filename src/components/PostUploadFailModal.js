import * as S from "../styles/components/PostUploadFailModal.style";
const PostUploadFailModal = ({ failText, setIsPostUploadFailModal }) => {
  const onclickConfirmBtn = () => {
    setIsPostUploadFailModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  return (
    <S.PostUploadFailModalBack>
      <S.PostUploadFailModalBox>
        <S.PostUploadFailModalTextBox>
          <S.PostUploadFailModalFailText>
            {failText}
          </S.PostUploadFailModalFailText>
        </S.PostUploadFailModalTextBox>
        <S.PostUploadFailModalBtnBox>
          <S.PostUploadFailModalConfirmBtn onClick={onclickConfirmBtn}>
            확인
          </S.PostUploadFailModalConfirmBtn>
        </S.PostUploadFailModalBtnBox>
      </S.PostUploadFailModalBox>
    </S.PostUploadFailModalBack>
  );
};

export default PostUploadFailModal;
