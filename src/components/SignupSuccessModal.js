import React from "react";
import * as SignupSuccessModalStyle from "../styles/componenet/SignupSuccessModalStyle";

const SignupSuccessModal = () => {
  return (
    <SignupSuccessModalStyle.SignupSuccessModalBack>
      <SignupSuccessModalStyle.SignupSuccessModalBox>
        <SignupSuccessModalStyle.SignupSuccessModalTextBox>
          <SignupSuccessModalStyle.SignupSuccessModalText>
            회원가입이 완료 되었습니다.
          </SignupSuccessModalStyle.SignupSuccessModalText>
          <SignupSuccessModalStyle.SignupSuccessModalText>
            잠시 후 로그인 페이지로 이동합니다!
          </SignupSuccessModalStyle.SignupSuccessModalText>
        </SignupSuccessModalStyle.SignupSuccessModalTextBox>
      </SignupSuccessModalStyle.SignupSuccessModalBox>
    </SignupSuccessModalStyle.SignupSuccessModalBack>
  );
};

export default SignupSuccessModal;
