import React, { useCallback, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { authService, dbService } from "../reactfbase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import PostItem from "../components/PostItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { hamburgerBtnClick, userAtom } from "../recoils/UserAtom";
import * as ProfileStyle from "../styles/pages/ProfileStyle";
import ProfileImgUploadModal from "../components/ProfileImgUploadModal";
import ProfileNameEditModal from "../components/ProfileNameEditModal";

// 현재 우리가 다양한 컴포넌트에 prop 로 전달해주고 있는 user 객체를 authService.currentUser 로 업데이트 해야한다. 하지만 set 함수로 업데이트 해도 리 랜더링이 되지 않는다. 왜일까?
// react 는 복잡하고 큰 객체를 전에 상태와 바뀌었는지 판단하는것을 어려워한다.
// 그럼 어떻게 리액트가 상태가 바뀐것을 판단하고 리 랜더링 해주게 할까?
// 첫번째 방법은 user 객체에서 필요한 데이터가 따로 가져와 새로운 객체를 생성해 사용하는 것이다. user 객체의 모든 내용을 사용하지 않는데 모든 데이터를 prop 로 전달하면서  사용할 필요가 없다는 뜻이다.
// 또 다른 방법은 user 객체 자체를 복사해서 업데이트 하는 것이다. JSON.parse(JSON.stringify(객체)) , Object.assign({},객체)

const Profile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  console.log("user", user);
  const [userUploadData, setUserUploadData] = useState([]); // 해당 유저가 작성한 게시글만 가져와서 저장하는 state
  const [newNickname, setNewNickname] = useState(user.displayName); // 해당 유저의 닉네임을 저장하는 state
  const profileImg = user.photoURL;
  const [selectMenu, setSelectMenu] = useState("1");
  const [isProfileImgUploadModal, setIsProfileImgUploadModal] = useState(false);
  const [isProfileNameEditModal, setIsProfileNameEditModal] = useState(false);
  console.log("유저 데이터", userUploadData);
  const onclickProfileImgUploadIcon = () => {
    setIsProfileImgUploadModal((prev) => !prev);
  };

  // 해당 유저가 작성한 글을 실시간으로 가져오기

  const getRealtimeUserData = async () => {
    console.log("hello");
    console.log("user id", user.uid);
    const q = query(
      collection(dbService, "test"),
      where("writer", "==", user.uid),
      orderBy("createTime")
    );
    const docSnap = await getDocs(q);
    const profileData = [];
    docSnap.forEach((doc) => {
      console.log("데이터", doc.data());
      profileData.push({ id: doc.id, ...doc.data() });
    });
    console.log("프로필 데이터", profileData);
    setUserUploadData(profileData);
  };
  const getUserLikePost = async () => {
    console.log("hello");
    const q = query(
      collection(dbService, "test"),
      where("likeMember", "array-contains", user.uid)
      // orderBy("createTime", "desc")
    );

    const docSnap = await getDocs(q);
    const profileData = [];
    docSnap.forEach((doc) => {
      console.log("데이터", doc.data());
      profileData.push({ id: doc.id, ...doc.data() });
    });
    setUserUploadData(profileData);
  };
  console.log("이미지 url", user.photoURL);
  const onclickSelectMenu = (e) => {
    const { id } = e.target;
    setSelectMenu(id);
    console.log("type", typeof id);
    if (id === "1") {
      getRealtimeUserData();
    } else if (id === "2") {
      getUserLikePost();
    }
  };

  useEffect(() => {
    getRealtimeUserData();
  }, [isProfileNameEditModal]);
  console.log("프로필 이미지", profileImg);
  return (
    <>
      {" "}
      <ProfileStyle.ProfileBack>
        <ProfileStyle.ProfileUserInfoBox>
          <ProfileStyle.ProfileUserImgBox>
            <ProfileStyle.ProfileUserInfoImg>
              {profileImg === undefined ? (
                <span class="material-symbols-outlined">person</span>
              ) : (
                <img src={profileImg} alt="profileImg" />
              )}
            </ProfileStyle.ProfileUserInfoImg>
            <ProfileStyle.ProfileUserImgUploadIcon
              onClick={onclickProfileImgUploadIcon}
            >
              <span class="material-symbols-outlined">add_circle</span>
            </ProfileStyle.ProfileUserImgUploadIcon>
            {/* <ProfileStyle.ProfileUserImgUploadInput
              type="file"
              accept="image/*"
              id="imgUploadInput"
              onChange={onchangeImageUpload}
            /> */}
          </ProfileStyle.ProfileUserImgBox>
          <ProfileStyle.ProfileUserInfoName>
            {user.displayName ? user.displayName : "닉네임을 만들어주세요."}
            <span
              class="material-symbols-outlined"
              onClick={() => {
                setIsProfileNameEditModal((prev) => !prev);
              }}
            >
              edit
            </span>
          </ProfileStyle.ProfileUserInfoName>
        </ProfileStyle.ProfileUserInfoBox>
        {/* <ProfileStyle.ProfileForm onSubmit={onsubmitNewNickname}>
    <ProfileStyle.ProfileFormInput
      type="text"
      value={newNickname}
      onChange={onchangeNewNickname}
      maxLength="5"
      placeholder="변경할 닉네임을 입력해주세요. 최대 5글자"
    />
    <ProfileStyle.ProfileFormSubmit type="submit" value="닉네임 변경" />
  </ProfileStyle.ProfileForm> */}
        <ProfileStyle.ProfileBox>
          <ProfileStyle.ProfileSelectMenu>
            <ProfileStyle.ProfileMenuItem
              id="1"
              selectMenu={selectMenu}
              onClick={onclickSelectMenu}
            >
              내가 작성한 게시물
            </ProfileStyle.ProfileMenuItem>
            <ProfileStyle.ProfileMenuItem
              id="2"
              selectMenu={selectMenu}
              onClick={onclickSelectMenu}
            >
              좋아요한 게시물
            </ProfileStyle.ProfileMenuItem>
          </ProfileStyle.ProfileSelectMenu>
          {userUploadData.length === 0 ? (
            <ProfileStyle.NoPost>현재 게시물이 없습니다.</ProfileStyle.NoPost>
          ) : (
            <ProfileStyle.ProfilePostBox>
              {userUploadData.map((data, index) => {
                return (
                  <PostItem
                    key={index}
                    data={data}
                    user={user}
                    index={index}
                    dataLen={userUploadData.length}
                  />
                );
              })}
            </ProfileStyle.ProfilePostBox>
          )}
        </ProfileStyle.ProfileBox>
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
    </>
  );
};

export default Profile;
