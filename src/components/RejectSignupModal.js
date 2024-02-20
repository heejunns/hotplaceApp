import * as S from "../styles/components/RejectSignupModal.style";
const RejectSignupModal = ({ setIsRejectSignupModal }) => {
  const onclickConfirmBtn = () => {
    setIsRejectSignupModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  return (
    <S.RejectSignupModalBack>
      <S.RejectSignupModalBox>
        <S.RejectSignupModalTextBox>
          <S.RejectSignupModalText>
            닉네임 중복확인 또는 비밀번호 확인을 진행 해주세요.
          </S.RejectSignupModalText>
        </S.RejectSignupModalTextBox>
        <S.RejectSignupModalBtnBox>
          <S.RejectSignupModalConfirmBtn onClick={onclickConfirmBtn}>
            확인
          </S.RejectSignupModalConfirmBtn>
        </S.RejectSignupModalBtnBox>
      </S.RejectSignupModalBox>
    </S.RejectSignupModalBack>
  );
};

export default RejectSignupModal;
