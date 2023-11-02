import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { authService, dbService } from "../reactfbase";
import * as SignupStyle from "../styles/pages/SignupStyle";
import SignupSuccessModal from "../components/SignupSuccessModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hamburgerBtnClick } from "../recoils/UserAtom";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import RejectSignupModal from "../components/RejectSignupModal";

// 회원가입을 하면 바로 자동으로 로그인이 되고 페이지가 회원가입 페이지에 머물어 있는 문제가 있다.
// 회원가입 하면 자동으로 홈 페이지로 이동하고 로그아웃되며 회원가입 때 입력한 이메일과 비밀번호로 로그인 하도록 만들기.

const Signup = () => {
  const navigate = useNavigate(); // useNavigate 훅스를 사용해서 로그 아웃시 "/" 주소로 강제 이동
  // 중복확인 버튼을 클릭하면 서브밋 이벤트가 발생함, 당연히 버튼에 달아둔 클릭 이벤트도 발생
  const [inputNewEmail, setInputNewEmail] = useState(""); // 입력하는 이메일 state
  const [inputNewPassword, setInputNewPassword] = useState(""); // 입력하는 비밀번호 state
  const [inputNewPasswordCheck, setInputNewPasswordCheck] = useState(""); // 입력하는 비밀번호확인 state
  const [checkPasswordApproval, setCheckPasswordApproval] = useState(null); // 입력하는 비밀번호와 비밀번호확인에 입력한 비밀번호가 같은 여부를 확인하는 state
  const [error, setError] = useState(""); // 에러가 발생하면 에러 메세지를 저장할 state
  const [isSignupSuccessModal, setIsSignSuccessModal] = useState(false);
  const [inputNewNickname, setInputNewNickname] = useState(""); // 입력하는 닉네임 state
  const [isNicknameOverlap, setIsNicknameOverlap] = useState(""); // 닉네임 중복 검사 여부 state
  const [isRejectSignupModal, setIsRejectSignupModal] = useState(false);
  // 입력하는 이메일과 비밀번호의 input 태그에서 onchange 이벤트가 발생하면 호출
  const onchangeInput = useCallback((event) => {
    const { name, value } = event.target;
    if (name === "newEmail") {
      setInputNewEmail(value);
    } else if (name === "newPassword") {
      setInputNewPassword(value);
    } else if (name === "newNickname") {
      setInputNewNickname(value);
    }
  }, []);

  const onclickNicknameOverlapCheck = async () => {
    try {
      const docRef = doc(dbService, "test", "nicknameDB");
      const docSnap = await getDoc(docRef);
      if (inputNewNickname === "") {
        setIsNicknameOverlap(null);
        return;
      }
      if (docSnap.exists()) {
        if (docSnap.data().data.includes(inputNewNickname)) {
          setIsNicknameOverlap(false);
        } else {
          setIsNicknameOverlap(true);
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 이메일과 비밀번호, 비밀번호확인을 입력하고 회원가입 버튼을 클릭하면 호출
  const onsubmitSignUpButton = async (e) => {
    try {
      e.preventDefault();
      document.body.style.overflow = "hidden";
      if (isNicknameOverlap !== true || checkPasswordApproval !== true) {
        setIsRejectSignupModal((prev) => !prev);
        return;
      }
      setIsSignSuccessModal((prev) => !prev);
      const docRef = doc(dbService, "test", "nicknameDB");
      const docSnap = await getDoc(docRef);
      const newNicknameData = [...docSnap.data().data, inputNewNickname];
      await setDoc(doc(dbService, "test", "nicknameDB"), {
        data: newNicknameData,
      });
      const createData = await createUserWithEmailAndPassword(
        authService,
        inputNewEmail,
        inputNewPassword
      );
      await updateProfile(authService.currentUser, {
        displayName: inputNewNickname,
      });
      await signOut(authService);
      document.body.style.overflow = "";
      setIsSignSuccessModal((prev) => !prev);
      navigate("/login");
    } catch (e) {
      console.log(e.message);
      switch (e.code) {
        case "auth/invalid-email":
          setError("잘못된 형식의 이메일 입니다.");
          break;
        case "auth/email-already-in-use":
          setError("이미 등록되어 있는 이메일 입니다.");
          break;
        case "auth/weak-password":
          setError("비밀번호가 6자리 미만 입니다.");
          break;
        default:
          console.log("에러");
      }
      setInputNewEmail("");
      setInputNewPassword("");
      setInputNewPasswordCheck("");
    }
  };
  // 비밀번호 확인 input 에서 onchange 이벤트가 발생하면 호출, 입력한 비밀번호와 같은 판단
  const onchangePasswordCheck = useCallback(
    (event) => {
      const { value } = event.target;
      if (value === "") {
        setCheckPasswordApproval(null);
      } else {
        setCheckPasswordApproval(value === inputNewPassword);
      }
      setInputNewPasswordCheck(value);
    },
    [inputNewPassword]
  );
  return (
    <>
      <SignupStyle.SignupBack>
        <Link to="/">
          {" "}
          <SignupStyle.SignupTitle>우리동네핫플</SignupStyle.SignupTitle>
        </Link>
        <SignupStyle.SignupForm onSubmit={onsubmitSignUpButton}>
          <SignupStyle.InputBox>
            <SignupStyle.NicknameInputTitleBox>
              <SignupStyle.InputText htmlFor="newNickname">
                닉네임
              </SignupStyle.InputText>
              <SignupStyle.OverlapNicknameCheckBtn
                onClick={onclickNicknameOverlapCheck}
                type="button"
              >
                닉네임 중복확인
              </SignupStyle.OverlapNicknameCheckBtn>
              <SignupStyle.NicknameOverlapCheckText>
                {isNicknameOverlap === ""
                  ? ""
                  : isNicknameOverlap === null
                  ? "닉네임을 입력 해주세요."
                  : isNicknameOverlap === true
                  ? "닉네임이 사용 가능 합니다."
                  : isNicknameOverlap === false
                  ? "입력하신 닉네임은 사용 중입니다."
                  : null}
              </SignupStyle.NicknameOverlapCheckText>
            </SignupStyle.NicknameInputTitleBox>
            <SignupStyle.SignupInput
              id="newNickname"
              name="newNickname"
              type="text"
              value={inputNewNickname}
              onChange={onchangeInput}
              placeholder="닉네임을 입력해주세요."
            />
          </SignupStyle.InputBox>
          <SignupStyle.InputBox>
            <SignupStyle.InputText htmlFor="newEmail">
              이메일
            </SignupStyle.InputText>
            <SignupStyle.SignupInput
              id="newEmail"
              name="newEmail"
              type="email"
              value={inputNewEmail}
              onChange={onchangeInput}
              placeholder="이메일을 입력해주세요."
            />
          </SignupStyle.InputBox>
          <SignupStyle.InputBox>
            <SignupStyle.InputText htmlFor="newPassword">
              비밀번호
            </SignupStyle.InputText>
            <SignupStyle.SignupInput
              id="newPassword"
              name="newPassword"
              type="password"
              value={inputNewPassword}
              onChange={onchangeInput}
              placeholder="비밀번호를 입력 해주세요."
            />
          </SignupStyle.InputBox>
          <SignupStyle.InputBox>
            <SignupStyle.InputText htmlFor="namePasswordCheck">
              비밀번호확인
            </SignupStyle.InputText>
            <SignupStyle.SignupInput
              id="newPasswordCheck"
              name="newPasswordCheck"
              type="password"
              value={inputNewPasswordCheck}
              onChange={onchangePasswordCheck}
              placeholder="비밀번호 확인을 위해 다시 입력 해주세요."
            />
            {checkPasswordApproval === null ? (
              <SignupStyle.InputText></SignupStyle.InputText>
            ) : checkPasswordApproval === false ? (
              <SignupStyle.ErrorText>
                비밀번호가 일치하지 않습니다.
              </SignupStyle.ErrorText>
            ) : (
              <SignupStyle.SuccessText>
                비밀번호가 일치합니다.
              </SignupStyle.SuccessText>
            )}
          </SignupStyle.InputBox>
          {/* <button onClick={navigate("/")}>로그인으로 돌아가기</button> */}
          <SignupStyle.SignupBtnBox>
            <SignupStyle.SignupBtn type="submit">
              회원가입
            </SignupStyle.SignupBtn>
          </SignupStyle.SignupBtnBox>
          {error ? (
            <SignupStyle.ErrorText>{error}</SignupStyle.ErrorText>
          ) : null}
        </SignupStyle.SignupForm>
      </SignupStyle.SignupBack>
      {isSignupSuccessModal && <SignupSuccessModal />}
      {isRejectSignupModal && (
        <RejectSignupModal setIsRejectSignupModal={setIsRejectSignupModal} />
      )}
    </>
  );
};

export default Signup;
