import * as S from "../styles/components/ProfileNameEditModal.style";
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
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import axios from "axios";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
const ProfileNameEditModal = ({ setIsProfileNameEditModal }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputNewNickname, setInputNewNickname] = useState("");
  const [isNicknameOverlapCheck, setIsNicknameOverlapCheck] = useState("");

  const onchangeNewName = ({ target: { value } }) => {
    setInputNewNickname(value);
  };

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
        // 변경 전 닉네임으로 등록된 게시물 전부다 가져오기
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

        // 가지고 온 데이터에 nickname 새로운 닉네임으로 업데이트
        const smaeDataFuncs = sameNicknamePostData.map((item) => {
          return updateDoc(doc(dbService, "test", item.id), {
            nickname: inputNewNickname,
          });
        });
        await axios.all(smaeDataFuncs);

        // nicknameDB 에 변경한 닉네임 저장
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
        if (docSnap.data().data.includes(inputNewNickname)) {
          setIsNicknameOverlapCheck(false);
        } else {
          setIsNicknameOverlapCheck(true);
        }
      } else {
        console.log("document 를 찾을 수 없습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { mutate: submitNewName, isLoading: submitNewNameIsLoading } =
    useMutation({ onsubmitNewName });
  const { mutate: nicknameOverlapCheck } = useMutation({
    onclickNicknameOverlapcheck,
  });

  return (
    <>
      <S.ProfileNameEditBack>
        <S.ProfileNameEditBox>
          <S.ProfileNameEditInput
            type="text"
            value={inputNewNickname}
            onChange={onchangeNewName}
            maxLength="10"
            placeholder="변경할 닉네임을 입력해주세요. 최대 10글자"
          />
          <S.NicknameOverlapCheckText>
            {isNicknameOverlapCheck === ""
              ? ""
              : isNicknameOverlapCheck === null
              ? "닉네임을 입력 해주세요."
              : isNicknameOverlapCheck === true
              ? "닉네임이 사용 가능 합니다."
              : isNicknameOverlapCheck === false
              ? "입력하신 닉네임은 사용 중입니다."
              : null}
          </S.NicknameOverlapCheckText>
          <S.ProfileNameEditBtnBox>
            <S.CancelBtn onClick={onclickCancelModal}>
              <span className="material-symbols-outlined">close</span>
            </S.CancelBtn>
            <S.NicknameoverlapCheckBtn onClick={nicknameOverlapCheck}>
              닉네임 중복 검사
            </S.NicknameoverlapCheckBtn>
            <S.EditBtn onClick={submitNewName}>닉네임 변경</S.EditBtn>
          </S.ProfileNameEditBtnBox>
        </S.ProfileNameEditBox>
      </S.ProfileNameEditBack>
      {submitNewName && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default ProfileNameEditModal;
