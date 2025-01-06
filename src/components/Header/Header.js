import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../reactfbase";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentPageAtom,
  currentSelectSortAtom,
  userAtom,
  userLocation,
} from "../../recoils/UserAtom";
import * as HeaderStyle from "../../styles/components/Header.style";

const headerData = [
  { name: "게시글 올리기", url: "/postupload" },
  { name: "카페", url: "/cafe" },
  { name: "맛집", url: "/food" },
];
const Header = () => {
  const [wheelPosition, setWheelPosition] = useState(window.scrollY > 0);
  const [currentSelectSort, setCurrentSelectSort] = useRecoilState(
    currentSelectSortAtom
  );
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const [clickHamburgerBtn, setClickHamburgerBtn] = useState(false);
  const { pathname } = useLocation();
  const user = useRecoilValue(userAtom);
  console.log(user);
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
  const onclickPageReset = () => {
    setCurrentSelectSort("최신글 순으로 보기");
    setCurrentPage(0);
  };
  useEffect(() => {
    const wheelFunc = () => {
      // console.log(window.scrollY);
      if (window.scrollY > 0) {
        setWheelPosition(true);
      } else if (window.scrollY === 0) {
        setWheelPosition(false);
      }
    };
    document.body.addEventListener("wheel", wheelFunc);
  }, []);
  return (
    <HeaderStyle.HeaderContainer
      backColor={pathname === "/" ? wheelPosition : "none"}
    >
      <HeaderStyle.HeaderBox>
        <HeaderStyle.AppTitleName
          backColor={pathname === "/" ? wheelPosition : "none"}
        >
          <a
            href="/"
            style={{ textDecoration: "none" }}
            onClick={() => {
              setCurrentSelectSort("최신글 순으로 보기");
              setCurrentPage(0);
              setClickHamburgerBtn(false);
            }}
          >
            우리동네핫플
          </a>
        </HeaderStyle.AppTitleName>
        {/* {user && user.displayName && (
          <Link to="/certification" style={{ textDecoration: "none" }}>
            <HeaderStyle.HeaderBoxItem>
              사장님 인증하기
              <span className="material-symbols-outlined">verified_user</span>
            </HeaderStyle.HeaderBoxItem>
          </Link>
        )} */}
        <HeaderStyle.HeaderMenuBox>
          {headerData.map((item) => {
            return (
              <Link
                to={
                  item.name === "게시글 올리기"
                    ? user
                      ? item.url
                      : "/login"
                    : item.url
                }
                style={{ textDecoration: "none" }}
                onClick={onclickPageReset}
              >
                <HeaderStyle.HeaderBoxItem
                  backColor={pathname === "/" ? wheelPosition : "none"}
                  currentPath={pathname === item.url}
                >
                  {item.name}
                </HeaderStyle.HeaderBoxItem>
              </Link>
            );
          })}
          {user ? (
            <Link
              to="/profile"
              onClick={() => {
                setCurrentPage(0);
              }}
            >
              <HeaderStyle.HeaderBoxItem
                backColor={pathname === "/" ? wheelPosition : "none"}
                currentPath={pathname === "/profile"}
              >
                {/* {user.displayName === undefined
                  ? "닉네임을 만들어주세요."
                  : `${user.displayName} 님`} */}
                <img src={user.photoURL} />
              </HeaderStyle.HeaderBoxItem>
            </Link>
          ) : (
            <Link to="/login">
              <HeaderStyle.HeaderBoxItem
                backColor={pathname === "/" ? wheelPosition : "none"}
              >
                로그인
              </HeaderStyle.HeaderBoxItem>
            </Link>
          )}
        </HeaderStyle.HeaderMenuBox>

        <HeaderStyle.HamburgerButtonIcon
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
          <HeaderStyle.HamburgerIconItem
            backColor={pathname === "/" ? wheelPosition : "none"}
            toggle={clickHamburgerBtn}
          ></HeaderStyle.HamburgerIconItem>
          <HeaderStyle.HamburgerIconItem
            backColor={pathname === "/" ? wheelPosition : "none"}
            toggle={clickHamburgerBtn}
          ></HeaderStyle.HamburgerIconItem>
          <HeaderStyle.HamburgerIconItem
            backColor={pathname === "/" ? wheelPosition : "none"}
            toggle={clickHamburgerBtn}
          ></HeaderStyle.HamburgerIconItem>
        </HeaderStyle.HamburgerButtonIcon>
      </HeaderStyle.HeaderBox>
      <HeaderStyle.HamburgerSideBarBackground
        toggle={clickHamburgerBtn}
      ></HeaderStyle.HamburgerSideBarBackground>
      <HeaderStyle.HamburgerSideBar toggle={clickHamburgerBtn} ref={sideBarRef}>
        <HeaderStyle.HamburgerSideBarList>
          {user ? (
            <Link
              to="/profile"
              onClick={() => {
                setClickHamburgerBtn(false);
                setCurrentPage(0);
              }}
            >
              <HeaderStyle.HamburgerSideBarItem toggle={clickHamburgerBtn}>
                {user.displayName === undefined
                  ? "닉네임을 만들어주세요."
                  : `${user.displayName} 님 프로필`}
              </HeaderStyle.HamburgerSideBarItem>
            </Link>
          ) : (
            <Link to="/login" onClick={() => setClickHamburgerBtn(false)}>
              <HeaderStyle.HamburgerSideBarItem toggle={clickHamburgerBtn}>
                로그인<span className="material-symbols-outlined">login</span>
              </HeaderStyle.HamburgerSideBarItem>
            </Link>
          )}

          {user &&
            user.displayName &&
            headerData.map((item) => {
              return (
                <Link
                  to={item.url}
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    setClickHamburgerBtn(false);
                    setCurrentPage(0);
                  }}
                >
                  <HeaderStyle.HamburgerSideBarItem toggle={clickHamburgerBtn}>
                    {item.name}
                  </HeaderStyle.HamburgerSideBarItem>
                </Link>
              );
            })}
        </HeaderStyle.HamburgerSideBarList>
      </HeaderStyle.HamburgerSideBar>
    </HeaderStyle.HeaderContainer>
  );
};

export default Header;
