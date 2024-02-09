import * as NoUserClickModalStyle from "../styles/components/NoUserClickModalStyle";
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
    <NoUserClickModalStyle.NoUserClickModalBack>
      <NoUserClickModalStyle.NoUserClickModalBox>
        <NoUserClickModalStyle.NoUserClickModalTextBox>
          <NoUserClickModalStyle.NoUserClickModalText>
            로그인이 필요한 페이지 입니다
          </NoUserClickModalStyle.NoUserClickModalText>
        </NoUserClickModalStyle.NoUserClickModalTextBox>
        <NoUserClickModalStyle.NoUserClickModalBtnBox>
          <NoUserClickModalStyle.ConfirmBtn onClick={onclickConfirm}>
            확인
          </NoUserClickModalStyle.ConfirmBtn>
          <NoUserClickModalStyle.LoginPageBtn onClick={onclickLoginPage}>
            로그인
          </NoUserClickModalStyle.LoginPageBtn>
        </NoUserClickModalStyle.NoUserClickModalBtnBox>
      </NoUserClickModalStyle.NoUserClickModalBox>
    </NoUserClickModalStyle.NoUserClickModalBack>
  );
};

export default NoUserClickModal;
