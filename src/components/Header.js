import { signOut } from "firebase/auth";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";
import { authService } from "../reactfbase";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { hamburgerBtnClick, userAtom } from "../recoils/UserAtom";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { dbService } from "../reactfbase";
import * as HeaderStyle from "../styles/HeaderStyle";

const Header = ({ userLocation }) => {
  const [clickHamburgerBtn, setClickHamburgerBtn] = useState(false);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate(); // useNavigate 훅스를 사용해서 로그 아웃시 "/" 주소로 강제 이동
  const [currentData, setCurrentData] = useState([]);
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
  // 좋아요 순 게시글 보기 클릭하였을 때
  const onclickPostLike = useCallback(() => {
    const q = query(
      collection(dbService, "test"),
      orderBy("likeNumber", "desc")
    );
    console.log(q);
    onSnapshot(q, (snapshot) => {
      setCurrentData([]);
      snapshot.forEach((doc) =>
        setCurrentData((prevDocData) => [
          ...prevDocData,
          { ...doc.data(), id: doc.id },
        ])
      );
    });
  }, []);
  // 사용자의 사는 지역 게시글만 보기 클릭하였을 때
  const onclickPostAddress = useCallback(() => {
    const q = query(
      collection(dbService, "test"),
      where("userLocation", "==", userLocation),
      orderBy("createTime", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setCurrentData([]);
      snapshot.forEach((doc) =>
        setCurrentData((prevDocData) => [
          ...prevDocData,
          { ...doc.data(), id: doc.id },
        ])
      );
    });
  }, [userLocation]);
  const onclickPost = useCallback((category) => {
    const q = query(
      collection(dbService, "test"),
      where("userSelectCategory", "==", category),
      orderBy("createTime", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setCurrentData([]);
      snapshot.forEach((doc) =>
        setCurrentData((prevDocData) => [
          ...prevDocData,
          { ...doc.data(), id: doc.id },
        ])
      );
    });
  }, []);

  return (
    <HeaderStyle.HeaderBackground>
      <HeaderStyle.HeaderMenuBox>
        <Link to="/" style={{ textDecoration: "none" }}>
          <HeaderStyle.AppTitleName>우리동네핫플</HeaderStyle.AppTitleName>
        </Link>
        <Link to="/postupload" style={{ textDecoration: "none" }}>
          <HeaderStyle.HeaderBoxItem>게시글 올리기</HeaderStyle.HeaderBoxItem>
        </Link>
      </HeaderStyle.HeaderMenuBox>

      <HeaderStyle.HeaderUserInfoBox>
        <li>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            {user.displayName === null ? (
              <HeaderStyle.HeaderBoxItem>
                {" "}
                <i class="fa-regular fa-user"></i>닉네임을 만들어주세요.
              </HeaderStyle.HeaderBoxItem>
            ) : (
              <HeaderStyle.HeaderBoxItem>
                {user.displayName} 님 프로필
              </HeaderStyle.HeaderBoxItem>
            )}
          </Link>
        </li>
        <li>
          <HeaderStyle.LogOutButton onClick={onclickLogoutButton}>
            <span class="material-symbols-outlined">logout</span>
            로그아웃
          </HeaderStyle.LogOutButton>
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
          <Link to="/postmake" style={{ textDecoration: "none" }}>
            <HeaderStyle.HeaderBoxItem>게시글 올리기</HeaderStyle.HeaderBoxItem>
          </Link>
          <HeaderStyle.HamburgerSideBarList onClick={() => onclickPost("cafe")}>
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
          </HeaderStyle.HamburgerSideBarList>
        </HeaderStyle.HamburgerSideBarBox>
      </HeaderStyle.HamburgerSideBar>
    </HeaderStyle.HeaderBackground>
  );
};

export default Header;
