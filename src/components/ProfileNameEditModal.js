import React from "react";
import * as ProfileNameEditModalStyle from "../styles/componenet/ProfileNameEditModalStyle";
import { useState } from "react";
import { authService } from "../reactfbase";
import { updateProfile } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoils/UserAtom";
const ProfileNameEditModal = ({ setIsProfileNameEditModal }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [newName, setNewName] = useState("");

  const onchangeNewName = (e) => {
    const { value } = e.target;
    setNewName(value);
  };

  const onclickCancelModal = () => {
    setIsProfileNameEditModal((prev) => !prev);
  };

  const onsubmitNewName = async (e) => {
    try {
      e.preventDefault();
      if (user.displayName !== newName) {
        await updateProfile(authService.currentUser, {
          displayName: newName,
        });
      }
      // 현재 유저의 정보를 필요한것만 업로드 하기
      // setCurrentUser({
      //   uid: authService.currentUser.uid,
      //   displayName: authService.currentUser.displayName,
      // });
      const newUser = JSON.parse(JSON.stringify(authService.currentUser));
      setUser(newUser);
      setNewName("");
      setIsProfileNameEditModal((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProfileNameEditModalStyle.ProfileNameEditBack>
      <ProfileNameEditModalStyle.ProfileNameEditBox>
        <ProfileNameEditModalStyle.ProfileNameEditInput
          type="text"
          value={newName}
          onChange={onchangeNewName}
          maxLength="5"
          placeholder="변경할 닉네임을 입력해주세요. 최대 5글자"
        />
        <ProfileNameEditModalStyle.ProfileNameEditBtnBox>
          <ProfileNameEditModalStyle.CancelBtn onClick={onclickCancelModal}>
            cancel
          </ProfileNameEditModalStyle.CancelBtn>
          <ProfileNameEditModalStyle.EditBtn onClick={onsubmitNewName}>
            edit
          </ProfileNameEditModalStyle.EditBtn>
        </ProfileNameEditModalStyle.ProfileNameEditBtnBox>
      </ProfileNameEditModalStyle.ProfileNameEditBox>
    </ProfileNameEditModalStyle.ProfileNameEditBack>
  );
};

export default ProfileNameEditModal;
