import * as S from "../styles/components/NoUserClickModal.style";
import { useNavigate } from "react-router-dom";
const NoUserClickModal = ({ setIsNoUserClickModal }) => {
  const navigate = useNavigate();
  const onclickConfirm = () => {
    setIsNoUserClickModal((prev) => !prev);
    document.body.style.overflow = "";
  };

  const onclickLoginPage = () => {
    setIsNoUserClickModal((prev) => !prev);
    document.body.style.overflow = "";
    navigate("/login");
  };

  return (
    <S.NoUserClickModalBack>
      <S.NoUserClickModalBox>
        <S.NoUserClickModalTextBox>
          <S.NoUserClickModalText>
            로그인이 필요한 페이지 입니다
          </S.NoUserClickModalText>
        </S.NoUserClickModalTextBox>
        <S.NoUserClickModalBtnBox>
          <S.ConfirmBtn onClick={onclickConfirm}>확인</S.ConfirmBtn>
          <S.LoginPageBtn onClick={onclickLoginPage}>로그인</S.LoginPageBtn>
        </S.NoUserClickModalBtnBox>
      </S.NoUserClickModalBox>
    </S.NoUserClickModalBack>
  );
};

export default NoUserClickModal;
