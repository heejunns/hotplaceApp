import React from "react";
import * as ProfileNameEditModalStyle from "../styles/componenet/ProfileNameEditModalStyle";
import { useState } from "react";
import { authService, dbService } from "../reactfbase";
import { updateProfile } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoils/UserAtom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import axios from "axios";
const ProfileNameEditModal = ({ setIsProfileNameEditModal }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputNewNickname, setInputNewNickname] = useState("");
  const [isNicknameOverlapCheck, setIsNicknameOverlapCheck] = useState("");

  const onchangeNewName = ({ target: { value } }) => {
    setInputNewNickname(value);
  };

  console.log("인풋 데이터", inputNewNickname);

  const onclickCancelModal = () => {
    setIsProfileNameEditModal((prev) => !prev);
  };

  const onsubmitNewName = async (e) => {
    try {
      e.preventDefault();
      if (!isNicknameOverlapCheck) {
        return;
      }
      if (user.displayName !== inputNewNickname) {
        const prevNickname = user.displayName;
        const q = query(
          collection(dbService, "test"),
          where("nickname", "==", prevNickname)
        );
        const querySnapshot = await getDocs(q);
        const sameNicknamePostData = [];
        querySnapshot.forEach((doc) => {
          sameNicknamePostData.push({ id: doc.id, ...doc.data() });
        });
        const smaeDataFuncs = sameNicknamePostData.map((item) => {
          return updateDoc(doc(dbService, "test", item.id), {
            nickname: inputNewNickname,
          });
        });
        await axios.all(smaeDataFuncs);
        const docRef = doc(dbService, "test", "nicknameDB");
        const docSnap = await getDoc(docRef);
        const newNicknameData = [...docSnap.data().data, inputNewNickname];
        await setDoc(doc(dbService, "test", "nicknameDB"), {
          data: newNicknameData,
        });
        await updateProfile(authService.currentUser, {
          displayName: inputNewNickname,
        });
      }
      // 현재 유저의 정보를 필요한것만 업로드 하기
      // setCurrentUser({
      //   uid: authService.currentUser.uid,
      //   displayName: authService.currentUser.displayName,
      // });
      const newUser = JSON.parse(JSON.stringify(authService.currentUser));
      setUser(newUser);
      setInputNewNickname("");
      setIsProfileNameEditModal((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  const onclickNicknameOverlapcheck = async () => {
    try {
      const docRef = doc(dbService, "test", "nicknameDB");
      const docSnap = await getDoc(docRef);
      if (inputNewNickname === "") {
        setIsNicknameOverlapCheck(null);
        return;
      }
      if (docSnap.exists()) {
        console.log(
          "Document data:",
          docSnap.data().data.includes(inputNewNickname)
        );
        if (docSnap.data().data.includes(inputNewNickname)) {
          setIsNicknameOverlapCheck(false);
        } else {
          setIsNicknameOverlapCheck(true);
        }
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProfileNameEditModalStyle.ProfileNameEditBack>
      <ProfileNameEditModalStyle.ProfileNameEditBox>
        <ProfileNameEditModalStyle.ProfileNameEditInput
          type="text"
          value={inputNewNickname}
          onChange={onchangeNewName}
          maxLength="10"
          placeholder="변경할 닉네임을 입력해주세요. 최대 10글자"
        />
        <ProfileNameEditModalStyle.NicknameOverlapCheckText>
          {isNicknameOverlapCheck === ""
            ? ""
            : isNicknameOverlapCheck === null
            ? "닉네임을 입력 해주세요."
            : isNicknameOverlapCheck === true
            ? "닉네임이 사용 가능 합니다."
            : isNicknameOverlapCheck === false
            ? "입력하신 닉네임은 사용 중입니다."
            : null}
        </ProfileNameEditModalStyle.NicknameOverlapCheckText>
        <ProfileNameEditModalStyle.ProfileNameEditBtnBox>
          <ProfileNameEditModalStyle.CancelBtn onClick={onclickCancelModal}>
            <span class="material-symbols-outlined">close</span>
          </ProfileNameEditModalStyle.CancelBtn>
          <ProfileNameEditModalStyle.NicknameoverlapCheckBtn
            onClick={onclickNicknameOverlapcheck}
          >
            닉네임 중복 검사
          </ProfileNameEditModalStyle.NicknameoverlapCheckBtn>
          <ProfileNameEditModalStyle.EditBtn onClick={onsubmitNewName}>
            닉네임 변경
          </ProfileNameEditModalStyle.EditBtn>
        </ProfileNameEditModalStyle.ProfileNameEditBtnBox>
      </ProfileNameEditModalStyle.ProfileNameEditBox>
    </ProfileNameEditModalStyle.ProfileNameEditBack>
  );
};

export default ProfileNameEditModal;
