import React from "react";
import * as NoUserClickModalStyle from "../styles/componenet/NoUserClickModalStyle";
import { useNavigate } from "react-router-dom";
const NoUserClickModal = ({ setIsNoUserClickModal }) => {
  const navigate = useNavigate();
  const onclickConfirm = () => {
    setIsNoUserClickModal((prev) => !prev);
  };

  const onclickLoginPage = () => {
    setIsNoUserClickModal((prev) => !prev);
    navigate("/login");
  };

  return (
    <NoUserClickModalStyle.NoUserClickModalBack>
      <NoUserClickModalStyle.NoUserClickModalBox>
        <NoUserClickModalStyle.NoUserClickModalTextBox>
          <NoUserClickModalStyle.NoUserClickModalText>
            로그인을 해야 볼 수 있는 페이지 입니다.
          </NoUserClickModalStyle.NoUserClickModalText>
        </NoUserClickModalStyle.NoUserClickModalTextBox>
        <NoUserClickModalStyle.NoUserClickModalBtnBox>
          <NoUserClickModalStyle.ConfirmBtn onClick={onclickConfirm}>
            확인
          </NoUserClickModalStyle.ConfirmBtn>
          <NoUserClickModalStyle.LoginPageBtn onClick={onclickLoginPage}>
            로그인하러 가기
          </NoUserClickModalStyle.LoginPageBtn>
        </NoUserClickModalStyle.NoUserClickModalBtnBox>
      </NoUserClickModalStyle.NoUserClickModalBox>
    </NoUserClickModalStyle.NoUserClickModalBack>
  );
};

export default NoUserClickModal;
