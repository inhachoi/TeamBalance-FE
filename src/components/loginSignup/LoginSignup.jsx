import React, { useState } from "react";
import {
  LoginSignupContainer,
  LoginSignupContent,
  LoginSignupForm,
  LoginSignupInput,
  LoginSignupChange,
  LoginSignupButton,
  LoginSignupCloseButton,
} from "./LoginSignup.module";

const LoginSignup = ({ onClose }) => {
  const [islogin, setIslogin] = useState(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleToggle = () => {
    setIslogin(!islogin);
  };

  const validateEmail = (id) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(id);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_]).{8,15}$/;
    return passwordRegex.test(password);
  };

  const handleIdChange = (e) => {
    const id = e.target.value;
    setId(id);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleNicknameChange = (e) => {
    const nickName = e.target.value;
    setNickname(nickName);
  };

  const newUserInfo = {
    id,
    password,
    nickname,
  };

  const userInfo = {
    id,
    password,
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (id.trim() !== "" && !validateEmail(id)) {
      alert("유효한 이메일 주소를 입력하세요.");
    }

    if (password.trim() !== "" && !validatePassword(password)) {
      alert(
        "비밀번호는 영어 대소문자, 특수문자 !@#$%^&*()_만 사용하여 8~15자로 입력하세요."
      );
    }

    if (islogin) {
      // 로그인 처리
      // userInfo로 post 전달
    } else {
      // 회원가입 처리
      // newUserInfo
      // newUserInfo로 post 전달
    }
  };

  return (
    <>
      <LoginSignupContainer>
        <LoginSignupCloseButton onClick={onClose}>X</LoginSignupCloseButton>
        <LoginSignupContent>
          <p>{islogin ? "로그인" : "회원가입"}</p>
          <LoginSignupForm onSubmit={handleFormSubmit}>
            <p>ID</p>
            <LoginSignupInput
              placeholder="&nbsp; email 형식으로 작성해주세요"
              value={id}
              onChange={handleIdChange}
            />
            <p>Password</p>
            <LoginSignupInput
              type="password"
              placeholder="&nbsp; 비밀번호 8~15자리"
              value={password}
              onChange={handlePasswordChange}
            />
            {!islogin && (
              <>
                <p>Nickname</p>
                <LoginSignupInput
                  placeholder="&nbsp; 닉네임"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
              </>
            )}
            <LoginSignupButton type="submit">
              {islogin ? "로그인" : "회원가입"}
            </LoginSignupButton>
          </LoginSignupForm>
          <LoginSignupChange>
            <p>
              {islogin
                ? "밸런스 게임은 처음이신가요?"
                : "이미 계정이 있으신가요?"}
              <button onClick={handleToggle} islogin={islogin}>
                {islogin ? "회원가입" : "로그인"}
              </button>
            </p>
          </LoginSignupChange>
        </LoginSignupContent>
      </LoginSignupContainer>
    </>
  );
};

export default LoginSignup;
