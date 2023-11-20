import * as RejectSignupModalStyle from "../styles/componenet/RejectSignupModalStyle";
const RejectSignupModal = ({ setIsRejectSignupModal }) => {
  const onclickConfirmBtn = () => {
    setIsRejectSignupModal((prev) => !prev);
    document.body.style.overflow = "";
  };
  return (
    <RejectSignupModalStyle.RejectSignupModalBack>
      <RejectSignupModalStyle.RejectSignupModalBox>
        <RejectSignupModalStyle.RejectSignupModalTextBox>
          <RejectSignupModalStyle.RejectSignupModalText>
            닉네임 중복확인 또는 비밀번호 확인을 진행 해주세요.
          </RejectSignupModalStyle.RejectSignupModalText>
        </RejectSignupModalStyle.RejectSignupModalTextBox>
        <RejectSignupModalStyle.RejectSignupModalBtnBox>
          <RejectSignupModalStyle.RejectSignupModalConfirmBtn
            onClick={onclickConfirmBtn}
          >
            확인
          </RejectSignupModalStyle.RejectSignupModalConfirmBtn>
        </RejectSignupModalStyle.RejectSignupModalBtnBox>
      </RejectSignupModalStyle.RejectSignupModalBox>
    </RejectSignupModalStyle.RejectSignupModalBack>
  );
};

export default RejectSignupModal;
