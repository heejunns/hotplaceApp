import * as S from "../styles/components/LoginFailModal.style";
const LoginFailModal = ({ setIsLoginFailModal }) => {
  const onclickCheckBtn = () => {
    setIsLoginFailModal(false);
  };
  return (
    <S.LoginFailModalBack>
      <S.LoginFailModalBox>
        <S.LoginFailModalText>
          이메일 또는 비밀번호가 일치하지 않습니다. <br />
          다시 로그인 해주세요.
        </S.LoginFailModalText>
        <S.LoginFailModalBtnBox>
          <S.CheckBtn onClick={onclickCheckBtn}>확인</S.CheckBtn>
        </S.LoginFailModalBtnBox>
      </S.LoginFailModalBox>
    </S.LoginFailModalBack>
  );
};

export default LoginFailModal;
