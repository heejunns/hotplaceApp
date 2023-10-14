import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { authService } from "../reactfbase";
import * as SignupStyle from "../styles/pages/SignupStyle";
import SignupSuccessModal from "../components/SignupSuccessModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hamburgerBtnClick } from "../recoils/UserAtom";

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
  const [inputNewNickname, setInputNewNickname] = useState("");
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

  console.log("nickname", inputNewNickname);
  // 이메일과 비밀번호, 비밀번호확인을 입력하고 회원가입 버튼을 클릭하면 호출
  const onsubmitSignUpButton = async (e) => {
    try {
      setIsSignSuccessModal((prev) => !prev);
      e.preventDefault();
      const createData = await createUserWithEmailAndPassword(
        authService,
        inputNewEmail,
        inputNewPassword
      );
      await signOut(authService);
      setIsSignSuccessModal((prev) => !prev);
      navigate("/login");
      console.log(createData);
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
              <SignupStyle.OverlapNicknameCheckBtn>
                닉네임 중복확인
              </SignupStyle.OverlapNicknameCheckBtn>
            </SignupStyle.NicknameInputTitleBox>
            <SignupStyle.SignupInput
              name="newNickname"
              type="email"
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
    </>
  );
};

export default Signup;
