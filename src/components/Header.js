import { signOut } from "firebase/auth";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";
import { authService } from "../reactfbase";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { hamburgerBtnClick, userAtom } from "../recoils/UserAtom";
import * as HeaderStyle from "../styles/componenet/HeaderStyle";

const Header = ({ userLocation }) => {
  const [clickHamburgerBtn, setClickHamburgerBtn] = useState(false);
  const user = useRecoilValue(userAtom);
  console.log("user", user);
  const navigate = useNavigate(); // useNavigate 훅스를 사용해서 로그 아웃시 "/" 주소로 강제 이동
  const setHamburgerBtnClickInfo = useSetRecoilState(hamburgerBtnClick);
  // 로그아웃 버튼을 클릭하면 호출되는 콜백 함수
  const onclickLogoutButton = async () => {
    // 로그아웃하기
    try {
      await signOut(authService);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeaderStyle.HeaderBackground>
      <HeaderStyle.HeaderMenuBox>
        <Link to="/" style={{ textDecoration: "none" }}>
          <HeaderStyle.AppTitleName>우리동네핫플</HeaderStyle.AppTitleName>
        </Link>
        {user && (
          <Link to="/postupload" style={{ textDecoration: "none" }}>
            <HeaderStyle.HeaderBoxItem>게시글 올리기</HeaderStyle.HeaderBoxItem>
          </Link>
        )}
      </HeaderStyle.HeaderMenuBox>

      <HeaderStyle.HeaderUserInfoBox>
        <li>
          {user ? (
            <Link to="/profile">
              <HeaderStyle.HeaderBoxItem>
                {user.displayName
                  ? `${user.displayName} 님 프로필`
                  : "닉네임을 만들어주세요."}
              </HeaderStyle.HeaderBoxItem>
            </Link>
          ) : (
            <Link to="/login">
              <HeaderStyle.HeaderBoxItem>
                로그인<span class="material-symbols-outlined">login</span>
              </HeaderStyle.HeaderBoxItem>
            </Link>
          )}
        </li>
        <li>
          {user ? (
            <HeaderStyle.LogOutButton onClick={onclickLogoutButton}>
              <span class="material-symbols-outlined">logout</span>
              로그아웃
            </HeaderStyle.LogOutButton>
          ) : (
            <Link to="/signup">
              <HeaderStyle.HeaderBoxItem>회원가입</HeaderStyle.HeaderBoxItem>
            </Link>
          )}
        </li>
      </HeaderStyle.HeaderUserInfoBox>
      <HeaderStyle.HamburgerButtonIcon
        onClick={() => {
          setHamburgerBtnClickInfo(!clickHamburgerBtn);
          setClickHamburgerBtn((prev) => !prev);
        }}
      >
        <HeaderStyle.HamburgerIconItem
          toggle={clickHamburgerBtn}
        ></HeaderStyle.HamburgerIconItem>
        <HeaderStyle.HamburgerIconItem
          toggle={clickHamburgerBtn}
        ></HeaderStyle.HamburgerIconItem>
        <HeaderStyle.HamburgerIconItem
          toggle={clickHamburgerBtn}
        ></HeaderStyle.HamburgerIconItem>
      </HeaderStyle.HamburgerButtonIcon>
      <HeaderStyle.HamburgerSideBar toggle={clickHamburgerBtn}>
        <HeaderStyle.HamburgerSideBarBox>
          <Link to="/postupload">
            <HeaderStyle.HamburgerSideBarList>
              게시글 올리기
            </HeaderStyle.HamburgerSideBarList>
          </Link>

          {user ? (
            <Link to="/profile">
              <HeaderStyle.HamburgerSideBarList>
                {`${user.displayName} 님 프로필가기`}{" "}
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          ) : (
            <Link to="/login">
              <HeaderStyle.HamburgerSideBarList>
                로그인<span class="material-symbols-outlined">login</span>
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          )}

          {user ? (
            <HeaderStyle.SideBarLogOutButton onClick={onclickLogoutButton}>
              로그아웃
              <span class="material-symbols-outlined">logout</span>
            </HeaderStyle.SideBarLogOutButton>
          ) : (
            <Link to="/signup">
              {" "}
              <HeaderStyle.HamburgerSideBarList>
                회원가입{" "}
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          )}

          {/* <HeaderStyle.HamburgerSideBarList onClick={() => onclickPost("cafe")}>
            카페 게시글
          </HeaderStyle.HamburgerSideBarList>
          <HeaderStyle.HamburgerSideBarList onClick={() => onclickPost("food")}>
            food 게시글
          </HeaderStyle.HamburgerSideBarList>
          <HeaderStyle.HamburgerSideBarList onClick={() => onclickPost("mart")}>
            마트 게시글
          </HeaderStyle.HamburgerSideBarList>
          <HeaderStyle.HamburgerSideBarList onClick={onclickPostLike}>
            좋아요 순으로 보기
          </HeaderStyle.HamburgerSideBarList>
          <HeaderStyle.HamburgerSideBarList onClick={onclickPostAddress}>
            나의 지역 게시글만 보기
          </HeaderStyle.HamburgerSideBarList> */}
        </HeaderStyle.HamburgerSideBarBox>
      </HeaderStyle.HamburgerSideBar>
    </HeaderStyle.HeaderBackground>
  );
};

export default Header;
