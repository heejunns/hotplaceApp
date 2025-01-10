import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../reactfbase";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LoginModalDataAtom,
  currentPageAtom,
  currentSelectSortAtom,
  userAtom,
} from "../../recoils/UserAtom";
import * as HeaderStyle from "../../styles/components/Header.style";
import Login from "../Login/Login";

// 헤더 네비게이션 데이터
const headerData = [
  { name: "게시글 업로드", url: "/postupload" },
  { name: "카페", url: "/cafe" },
  { name: "맛집", url: "/food" },
];

// 헤더 컴포넌트
const Header = () => {
  const navigate = useNavigate();

  const [loginModal, setLoginModal] = useRecoilState(LoginModalDataAtom);
  const [clickHamburgerBtn, setClickHamburgerBtn] = useState(false);
  const { pathname } = useLocation();
  console.log(pathname);
  console.log(pathname === "/postupload");
  const user = useRecoilValue(userAtom);
  console.log("user", user);
  const sideBarRef = useRef();
  const hamburgerRef = useRef();
  useEffect(() => {
    const outSideClick = ({ target }) => {
      if (
        sideBarRef &&
        hamburgerRef &&
        sideBarRef.current &&
        hamburgerRef.current &&
        !sideBarRef.current.contains(target) &&
        !hamburgerRef.current.contains(target)
      ) {
        setClickHamburgerBtn(false);
        document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("mousedown", outSideClick);
  }, []);

  return (
    <>
      {loginModal && <Login />}

      <HeaderStyle.HeaderContainer>
        <HeaderStyle.HeaderBox>
          <HeaderStyle.AppName>
            <a
              href="/"
              style={{ textDecoration: "none" }}
              onClick={() => {
                setClickHamburgerBtn(false);
              }}
            >
              우리동네핫플
            </a>
          </HeaderStyle.AppName>
          {/* {user && user.displayName && (
          <Link to="/certification" style={{ textDecoration: "none" }}>
            <HeaderStyle.HeaderBoxItem>
              사장님 인증하기
              <span className="material-symbols-outlined">verified_user</span>
            </HeaderStyle.HeaderBoxItem>
          </Link>
        )} */}
          <HeaderStyle.HeaderNav>
            {headerData.map((item) => {
              console.log("뭐야", pathname === item.url);
              return item.name === "게시글 업로드" ? (
                <HeaderStyle.HeaderNavItem
                  onClick={() => {
                    if (user) {
                      navigate(item.url);
                    } else {
                      setLoginModal((prev) => !prev);
                      document.body.style.overflow = "hidden";
                    }
                  }}
                >
                  {item.name}
                </HeaderStyle.HeaderNavItem>
              ) : (
                <HeaderStyle.HeaderNavItem>
                  <Link
                    currentPath={pathname === item.url}
                    to={
                      item.name === "게시글 올리기"
                        ? user
                          ? item.url
                          : "/login"
                        : item.url
                    }
                  >
                    {item.name}
                  </Link>
                </HeaderStyle.HeaderNavItem>
              );
            })}
            {user ? (
              <HeaderStyle.HeaderNavItem>
                <Link to="/profile" currentPath={pathname === "/profile"}>
                  <img src={user.photoURL} />
                </Link>
                {/* {user.displayName === undefined
                  ? "닉네임을 만들어주세요."
                  : `${user.displayName} 님`} */}
              </HeaderStyle.HeaderNavItem>
            ) : (
              <HeaderStyle.HeaderNavItem
                onClick={() => {
                  setLoginModal((prev) => !prev);
                  document.body.style.overflow = "hidden";
                }}
              >
                로그인
              </HeaderStyle.HeaderNavItem>
            )}
          </HeaderStyle.HeaderNav>

          <HeaderStyle.HamburgerButton
            onClick={() =>
              setClickHamburgerBtn((prev) => {
                if (prev === false) {
                  document.body.style.overflow = "hidden";
                } else if (prev === true) {
                  document.body.style.overflow = "unset";
                }
                return !prev;
              })
            }
            ref={hamburgerRef}
          >
            <HeaderStyle.HamburgerItem
              toggle={clickHamburgerBtn}
            ></HeaderStyle.HamburgerItem>
            <HeaderStyle.HamburgerItem
              toggle={clickHamburgerBtn}
            ></HeaderStyle.HamburgerItem>
            <HeaderStyle.HamburgerItem
              toggle={clickHamburgerBtn}
            ></HeaderStyle.HamburgerItem>
          </HeaderStyle.HamburgerButton>
        </HeaderStyle.HeaderBox>
        <HeaderStyle.SideBarBackground
          toggle={clickHamburgerBtn}
        ></HeaderStyle.SideBarBackground>
        <HeaderStyle.SideBar toggle={clickHamburgerBtn} ref={sideBarRef}>
          <HeaderStyle.SideBarList>
            {user ? (
              <HeaderStyle.SideBarItem toggle={clickHamburgerBtn}>
                <Link
                  to="/profile"
                  onClick={() => {
                    setClickHamburgerBtn(false);
                  }}
                >
                  {user.displayName === undefined
                    ? "닉네임을 만들어주세요."
                    : `${user.displayName} 님 프로필`}
                </Link>
              </HeaderStyle.SideBarItem>
            ) : (
              <HeaderStyle.SideBarItem toggle={clickHamburgerBtn}>
                <Link to="/login" onClick={() => setClickHamburgerBtn(false)}>
                  로그인<span className="material-symbols-outlined">login</span>
                </Link>
              </HeaderStyle.SideBarItem>
            )}

            {headerData.map((item) => {
              return (
                <HeaderStyle.SideBarItem toggle={clickHamburgerBtn}>
                  <Link
                    to={item.url}
                    onClick={() => {
                      setClickHamburgerBtn(false);
                    }}
                  >
                    {item.name}
                  </Link>
                </HeaderStyle.SideBarItem>
              );
            })}
          </HeaderStyle.SideBarList>
        </HeaderStyle.SideBar>
      </HeaderStyle.HeaderContainer>
    </>
  );
};

export default Header;
