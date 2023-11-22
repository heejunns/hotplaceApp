import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../reactfbase";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPageAtom, userAtom } from "../recoils/UserAtom";
import * as HeaderStyle from "../styles/componenet/HeaderStyle";

const Header = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const [clickHamburgerBtn, setClickHamburgerBtn] = useState(false);
  const { pathname } = useLocation();
  const user = useRecoilValue(userAtom);
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
      }
    };
    document.addEventListener("mousedown", outSideClick);
  }, []);
  const navigate = useNavigate(); // useNavigate 훅스를 사용해서 로그 아웃시 "/" 주소로 강제 이동
  // 로그아웃 버튼을 클릭하면 호출되는 콜백 함수
  const onclickLogoutButton = async () => {
    // 로그아웃하기
    try {
      await signOut(authService);
      navigate("/");
      setClickHamburgerBtn(false);
    } catch (e) {
      console.log(e);
    }
  };
  const onclickPageReset = () => {
    setCurrentPage(0);
  };
  return (
    <HeaderStyle.HeaderBackground>
      <HeaderStyle.HeaderMenuBox>
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={() => {
            setCurrentPage(0);
            setClickHamburgerBtn(false);
          }}
        >
          <HeaderStyle.AppTitleName>우리동네핫플</HeaderStyle.AppTitleName>
        </Link>
        {user && user.displayName && (
          <Link to="/postupload" style={{ textDecoration: "none" }}>
            <HeaderStyle.HeaderBoxItem currentPath={pathname === "/postupload"}>
              게시글 올리기
              <span className="material-symbols-outlined">upload_file</span>
            </HeaderStyle.HeaderBoxItem>
          </Link>
        )}
        {user && user.displayName && (
          <Link to="/certification" style={{ textDecoration: "none" }}>
            <HeaderStyle.HeaderBoxItem>
              사장님 인증하기
              <span className="material-symbols-outlined">verified_user</span>
            </HeaderStyle.HeaderBoxItem>
          </Link>
        )}
        {user && user.displayName && (
          <Link
            to="/cafe"
            style={{ textDecoration: "none" }}
            onClick={onclickPageReset}
          >
            <HeaderStyle.HeaderBoxItem currentPath={pathname === "/cafe"}>
              카페
            </HeaderStyle.HeaderBoxItem>
          </Link>
        )}
        {user && user.displayName && (
          <Link
            to="/food"
            style={{ textDecoration: "none" }}
            onClick={onclickPageReset}
          >
            <HeaderStyle.HeaderBoxItem currentPath={pathname === "/food"}>
              음식
            </HeaderStyle.HeaderBoxItem>
          </Link>
        )}
        {user && user.displayName && (
          <Link
            to="/mart"
            style={{ textDecoration: "none" }}
            onClick={onclickPageReset}
          >
            <HeaderStyle.HeaderBoxItem currentPath={pathname === "/mart"}>
              마트
            </HeaderStyle.HeaderBoxItem>
          </Link>
        )}
      </HeaderStyle.HeaderMenuBox>

      <HeaderStyle.HeaderUserInfoBox>
        <li>
          {user ? (
            <Link to="/profile">
              <HeaderStyle.HeaderBoxItem currentPath={pathname === "/profile"}>
                {user.displayName === undefined
                  ? "닉네임을 만들어주세요."
                  : `${user.displayName} 님 프로필`}
              </HeaderStyle.HeaderBoxItem>
            </Link>
          ) : (
            <Link to="/login">
              <HeaderStyle.HeaderBoxItem>
                로그인<span className="material-symbols-outlined">login</span>
              </HeaderStyle.HeaderBoxItem>
            </Link>
          )}
        </li>
        <li>
          {user ? (
            <HeaderStyle.LogOutButton onClick={onclickLogoutButton}>
              <span className="material-symbols-outlined">logout</span>
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
        onClick={() => setClickHamburgerBtn((prev) => !prev)}
        ref={hamburgerRef}
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
      <HeaderStyle.HamburgerSideBar toggle={clickHamburgerBtn} ref={sideBarRef}>
        <HeaderStyle.HamburgerSideBarBox>
          {user ? (
            <Link to="/profile" onClick={() => setClickHamburgerBtn(false)}>
              <HeaderStyle.HamburgerSideBarList>
                {user.displayName === undefined
                  ? "닉네임을 만들어주세요."
                  : `${user.displayName} 님 프로필`}
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          ) : (
            <Link to="/login" onClick={() => setClickHamburgerBtn(false)}>
              <HeaderStyle.HamburgerSideBarList>
                로그인<span className="material-symbols-outlined">login</span>
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          )}

          {user ? (
            <HeaderStyle.SideBarLogOutButton onClick={onclickLogoutButton}>
              로그아웃
              <span className="material-symbols-outlined">logout</span>
            </HeaderStyle.SideBarLogOutButton>
          ) : (
            <Link to="/signup" onClick={() => setClickHamburgerBtn(false)}>
              <HeaderStyle.HamburgerSideBarList>
                회원가입
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          )}
          {user && (
            <Link to="/postupload" onClick={() => setClickHamburgerBtn(false)}>
              <HeaderStyle.HamburgerSideBarList>
                게시글 올리기{" "}
                <span className="material-symbols-outlined">upload_file</span>
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          )}
          {/* {user && (
            <Link
              to="/certification"
              onClick={() => setClickHamburgerBtn(false)}
            >
              <HeaderStyle.HamburgerSideBarList>
                사장님 인증하기
                <span className="material-symbols-outlined">verified_user</span>
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          )} */}
          {user && user.displayName && (
            <Link
              to="/cafe"
              style={{ textDecoration: "none" }}
              onClick={() => {
                setClickHamburgerBtn(false);
                setCurrentPage(0);
              }}
            >
              <HeaderStyle.HamburgerSideBarList>
                카페
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          )}
          {user && user.displayName && (
            <Link
              to="/food"
              style={{ textDecoration: "none" }}
              onClick={() => {
                setClickHamburgerBtn(false);
                setCurrentPage(0);
              }}
            >
              <HeaderStyle.HamburgerSideBarList>
                음식
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          )}
          {user && user.displayName && (
            <Link
              to="/mart"
              style={{ textDecoration: "none" }}
              onClick={() => {
                setClickHamburgerBtn(false);
                setCurrentPage(0);
              }}
            >
              <HeaderStyle.HamburgerSideBarList>
                마트
              </HeaderStyle.HamburgerSideBarList>
            </Link>
          )}
        </HeaderStyle.HamburgerSideBarBox>
      </HeaderStyle.HamburgerSideBar>
    </HeaderStyle.HeaderBackground>
  );
};

export default Header;
