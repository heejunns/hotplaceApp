import React, { useState } from "react";
import { dbService } from "../reactfbase";
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
import * as ProfileStyle from "../styles/pages/ProfileStyle";
import ProfileImgUploadModal from "../components/ProfileImgUploadModal";
import ProfileNameEditModal from "../components/ProfileNameEditModal";
import { useQuery } from "react-query";
import { Loading } from "../styles/componenet/LoadingStyle";
import { PulseLoader } from "react-spinners";
import PageNation from "../components/Home/PageNation";

// 현재 우리가 다양한 컴포넌트에 prop 로 전달해주고 있는 user 객체를 authService.currentUser 로 업데이트 해야한다. 하지만 set 함수로 업데이트 해도 리 랜더링이 되지 않는다. 왜일까?
// react 는 복잡하고 큰 객체를 전에 상태와 바뀌었는지 판단하는것을 어려워한다.
// 그럼 어떻게 리액트가 상태가 바뀐것을 판단하고 리 랜더링 해주게 할까?
// 첫번째 방법은 user 객체에서 필요한 데이터가 따로 가져와 새로운 객체를 생성해 사용하는 것이다. user 객체의 모든 내용을 사용하지 않는데 모든 데이터를 prop 로 전달하면서  사용할 필요가 없다는 뜻이다.
// 또 다른 방법은 user 객체 자체를 복사해서 업데이트 하는 것이다. JSON.parse(JSON.stringify(객체)) , Object.assign({},객체)

const Profile = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const user = useRecoilValue(userAtom);
  const profileImg = user && user.photoURL;
  const [selectMenu, setSelectMenu] = useState("userProfile");
  const [isProfileImgUploadModal, setIsProfileImgUploadModal] = useState(false);
  const [isProfileNameEditModal, setIsProfileNameEditModal] = useState(false);

  const onclickProfileImgUploadIcon = () => {
    setIsProfileImgUploadModal((prev) => !prev);
  };

  // 해당 유저가 작성한 글을 실시간으로 가져오기

  const getUserData = async (selectMenu) => {
    let q;
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
    const profileData = [];
    docSnap.forEach((doc) => {
      profileData.push({ id: doc.id, ...doc.data() });
    });
    return profileData;
  };

  const { data: profileData, isLoading: getProfileDataIsLoading } = useQuery(
    ["uploadData", selectMenu],
    () => getUserData(selectMenu)
  );
  // 쿼리 함수
  const getCurrentData = async (selectMenu, currentPage) => {
    try {
      let q;
      if (selectMenu === "userProfile") {
        q = query(
          collection(dbService, "test"),
          where("writer", "==", user.uid),
          orderBy("createTime", "desc"),
          limit(8),
          startAt(profileData[currentPage * 8].createTime)
        );
      } else if (selectMenu === "userLike") {
        q = query(
          collection(dbService, "test"),
          where("likeMember", "array-contains", user.uid),
          orderBy("createTime", "desc"),
          limit(8),
          startAt(profileData[currentPage * 8].createTime)
        );
      }
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  // 쿼리 코드
  const { data: currentData, isLoading: currentDataIsLoading } = useQuery(
    ["pageHandle", currentPage, selectMenu],
    () => getCurrentData(selectMenu, currentPage),
    {
      enabled: !!profileData,
      keepPreviousData: true,
    }
  );

  const onclickSelectMenu = ({ target: { id } }) => {
    setSelectMenu(id);
    setCurrentPage(0);
  };

  return (
    <>
      <ProfileStyle.ProfileBack>
        <ProfileStyle.ProfileUserInfoBox>
          <ProfileStyle.ProfileUserImgBox>
            <ProfileStyle.ProfileUserInfoImg>
              {profileImg === undefined ? (
                <span className="material-symbols-outlined">person</span>
              ) : (
                <img src={profileImg} alt="profileImg" />
              )}
            </ProfileStyle.ProfileUserInfoImg>
            <ProfileStyle.ProfileUserImgUploadIcon
              onClick={onclickProfileImgUploadIcon}
            >
              <span className="material-symbols-outlined">add_circle</span>
            </ProfileStyle.ProfileUserImgUploadIcon>
            {/* <ProfileStyle.ProfileUserImgUploadInput
              type="file"
              accept="image/*"
              id="imgUploadInput"
              onChange={onchangeImageUpload}
            /> */}
          </ProfileStyle.ProfileUserImgBox>
          <ProfileStyle.ProfileUserInfoName>
            {user ? user.displayName : "닉네임을 만들어주세요."}
            <span
              className="material-symbols-outlined"
              onClick={() => {
                setIsProfileNameEditModal((prev) => !prev);
              }}
            >
              edit
            </span>
          </ProfileStyle.ProfileUserInfoName>
        </ProfileStyle.ProfileUserInfoBox>
        <ProfileStyle.ProfileBox>
          <ProfileStyle.ProfileSelectMenu>
            <ProfileStyle.ProfileMenuItem
              id="userProfile"
              selectMenu={selectMenu}
              onClick={onclickSelectMenu}
            >
              내가 작성한 게시물
            </ProfileStyle.ProfileMenuItem>
            <ProfileStyle.ProfileMenuItem
              id="userLike"
              selectMenu={selectMenu}
              onClick={onclickSelectMenu}
            >
              좋아요한 게시물
            </ProfileStyle.ProfileMenuItem>
          </ProfileStyle.ProfileSelectMenu>
          {profileData && currentData && currentData.length === 0 ? (
            <ProfileStyle.NoPost>현재 게시물이 없습니다.</ProfileStyle.NoPost>
          ) : (
            <ProfileStyle.ProfilePostBox>
              {currentData &&
                currentData.map((data, index) => {
                  return <PostItem key={index} data={data} />;
                })}
            </ProfileStyle.ProfilePostBox>
          )}
        </ProfileStyle.ProfileBox>
        {currentData && profileData && (
          <PageNation currentData={currentData} postData={profileData} />
        )}
      </ProfileStyle.ProfileBack>
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
      {getProfileDataIsLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default Profile;
