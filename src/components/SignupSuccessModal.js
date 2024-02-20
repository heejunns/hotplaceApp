import * as S from "../styles/components/SignupSuccessModal.style";

const SignupSuccessModal = () => {
  return (
    <S.SignupSuccessModalBack>
      <S.SignupSuccessModalBox>
        <S.SignupSuccessModalTextBox>
          <S.SignupSuccessModalText>
            회원가입이 완료 되었습니다.
          </S.SignupSuccessModalText>
          <S.SignupSuccessModalText>
            잠시 후 로그인 페이지로 이동합니다!
          </S.SignupSuccessModalText>
        </S.SignupSuccessModalTextBox>
      </S.SignupSuccessModalBox>
    </S.SignupSuccessModalBack>
  );
};

export default SignupSuccessModal;
