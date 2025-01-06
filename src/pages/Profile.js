import React, { useEffect, useState } from "react";
import { authService, dbService } from "../reactfbase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import PostItem from "../components/Home/PostItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPageAtom, userAtom } from "../recoils/UserAtom";
import * as S from "../styles/pages/Profile.style";
import ProfileImgUploadModal from "../components/ProfileImgUploadModal";
import ProfileNameEditModal from "../components/ProfileNameEditModal";
import { Loading } from "../styles/components/Loading.style";
import { FadeLoader, PulseLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { debounce } from "lodash";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// 현재 우리가 다양한 컴포넌트에 prop 로 전달해주고 있는 user 객체를 authService.currentUser 로 업데이트 해야한다. 하지만 set 함수로 업데이트 해도 리 랜더링이 되지 않는다. 왜일까?
// react 는 복잡하고 큰 객체를 전에 상태와 바뀌었는지 판단하는것을 어려워한다.
// 그럼 어떻게 리액트가 상태가 바뀐것을 판단하고 리 랜더링 해주게 할까?
// 첫번째 방법은 user 객체에서 필요한 데이터가 따로 가져와 새로운 객체를 생성해 사용하는 것이다. user 객체의 모든 내용을 사용하지 않는데 모든 데이터를 prop 로 전달하면서  사용할 필요가 없다는 뜻이다.
// 또 다른 방법은 user 객체 자체를 복사해서 업데이트 하는 것이다. JSON.parse(JSON.stringify(객체)) , Object.assign({},객체)

const Profile = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const user = useRecoilValue(userAtom);
  console.log(user);
  const profileImg = user && user.photoURL;
  const [selectMenu, setSelectMenu] = useState("userProfile");
  const [isProfileImgUploadModal, setIsProfileImgUploadModal] = useState(false);
  const [isProfileNameEditModal, setIsProfileNameEditModal] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [noFunc, setNoFunc] = useState(false);
  const [profileDataLoading, setProfileDataLoading] = useState(false);
  const [start, setStart] = useState();
  const onclickProfileImgUploadIcon = () => {
    setIsProfileImgUploadModal((prev) => !prev);
  };
  console.log(profileData);
  // 해당 유저가 작성한 글을 실시간으로 가져오기

  const getUserData = async (selectMenu) => {
    try {
      let q;
      setProfileDataLoading(true);
      if (selectMenu === "userProfile") {
        q = query(
          collection(dbService, "test"),
          where("writer", "==", user.uid),
          orderBy("createTime", "desc")
        );
      } else if (selectMenu === "userLike") {
        q = query(
          collection(dbService, "test"),
          where("likeMember", "array-contains", user.uid),
          orderBy("createTime", "desc")
        );
      }
      const docSnap = await getDocs(q);
      const data = [];
      docSnap.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setProfileData(data);
      setStart(data[0]?.createTime);
      setProfileDataLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(selectMenu);
  useEffect(() => {
    if (user?.uid) {
      getUserData(selectMenu);
    }
  }, [user, selectMenu]);
  useEffect(() => {
    if (user?.uid) {
      getCurrentData(selectMenu);
    }
  }, [profileData]);
  // const { data: profileData, isLoading: getProfileDataIsLoading } = useQuery({
  //   queryKey: ["uploadData", selectMenu],
  //   queryFn: () => getUserData(selectMenu),
  // });
  console.log("nofunc", noFunc);
  // 쿼리 함수
  const getCurrentData = async (selectMenu, currentPage) => {
    try {
      console.log("호출한다.");
      let q;
      if (selectMenu === "userProfile") {
        q = query(
          collection(dbService, "test"),
          where("writer", "==", user.uid),
          orderBy("createTime", "desc"),
          limit(9),
          startAt(start)
        );
      } else if (selectMenu === "userLike") {
        q = query(
          collection(dbService, "test"),
          where("likeMember", "array-contains", user.uid),
          orderBy("createTime", "desc"),
          limit(9),
          startAt(start)
        );
      }
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      console.log("h", data);
      if (data.length === 0) {
        setNoFunc(true);
      }
      if (data.length === 9) {
        setStart(data[8].createTime);
        setCurrentData((prev) => prev.concat(data.slice(0, 8)));
      } else if (data.length < 9) {
        // setNoFunc(true);
        setStart(null);
        setCurrentData((prev) => prev.concat(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useBottomScrollListener(() => {
    console.log("hello");
    const fetchDebounce = debounce(() => {
      console.log("호출해");
      if (!noFunc) {
        getCurrentData(selectMenu);
      }
    }, 1000);
    fetchDebounce();
  });
  // 쿼리 코드
  // const { data: currentData, isLoading: currentDataIsLoading } = useQuery({
  //   queryKey: ["pageHandle", currentPage, selectMenu],
  //   queryFn: () => getCurrentData(selectMenu, currentPage),

  //   enabled: !!profileData,
  //   keepPreviousData: true,
  // });
  const onclickLogoutButton = async () => {
    // 로그아웃하기
    try {
      await signOut(authService);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const onclickSelectMenu = ({ target: { id } }) => {
    setSelectMenu(id);
    setCurrentData([]);
    setNoFunc(false);
  };

  return (
    <>
      <S.ProfileBack>
        <S.ProfileUserInfoBox>
          <div className="hello">안녕하세요.</div>
          <div>
            <S.ProfileUserImgBox>
              <S.ProfileUserInfoImg>
                {profileImg === undefined ? (
                  <span className="material-symbols-outlined">person</span>
                ) : (
                  <img src={profileImg} alt="profileImg" />
                )}
              </S.ProfileUserInfoImg>

              {/* <S.ProfileUserImgUploadInput
              type="file"
              accept="image/*"
              id="imgUploadInput"
              onChange={onchangeImageUpload}
            /> */}
            </S.ProfileUserImgBox>
            <S.ProfileUserInfoName>
              {user ? `${user.displayName} 님` : "닉네임을 만들어주세요."}
            </S.ProfileUserInfoName>
          </div>
          <S.ProfileUserInfoBtnBox>
            <S.ProfileUserInfoBtn
              backColor="#46FFFF"
              onClick={onclickProfileImgUploadIcon}
            >
              프로필 사진 변경
            </S.ProfileUserInfoBtn>
            <S.ProfileUserInfoBtn
              backColor="#79FFCE"
              onClick={() => {
                setIsProfileNameEditModal((prev) => !prev);
              }}
            >
              닉네임 변경
            </S.ProfileUserInfoBtn>
            <S.ProfileUserInfoBtn
              backColor="#79FFCE"
              onClick={onclickLogoutButton}
            >
              로그아웃
            </S.ProfileUserInfoBtn>
          </S.ProfileUserInfoBtnBox>
        </S.ProfileUserInfoBox>
        <S.ProfileBox>
          <S.ProfileSelectMenu>
            <S.ProfileMenuItem
              id="userProfile"
              selectMenu={selectMenu}
              onClick={onclickSelectMenu}
            >
              내가 작성한 게시물
            </S.ProfileMenuItem>
            <S.ProfileMenuItem
              id="userLike"
              selectMenu={selectMenu}
              onClick={onclickSelectMenu}
            >
              좋아요한 게시물
            </S.ProfileMenuItem>
          </S.ProfileSelectMenu>
          {profileData && currentData && currentData.length === 0 ? (
            <S.NoPost>현재 게시물이 없습니다.</S.NoPost>
          ) : (
            <S.ProfilePostBox>
              {currentData &&
                currentData.map((data, index) => {
                  return <PostItem key={index} data={data} />;
                })}
            </S.ProfilePostBox>
          )}
        </S.ProfileBox>
        {/* {currentData && profileData && (
          <PageNation currentData={currentData} postData={profileData} />
        )} */}
      </S.ProfileBack>
      {isProfileImgUploadModal && (
        <ProfileImgUploadModal
          setIsProfileImgUploadModal={setIsProfileImgUploadModal}
        />
      )}
      {isProfileNameEditModal && (
        <ProfileNameEditModal
          setIsProfileNameEditModal={setIsProfileNameEditModal}
        />
      )}
      {profileDataLoading && (
        <Loading>
          <FadeLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default Profile;
