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
import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser } from "../../axios/LoginSignupAxios";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/storageUtils";
import { setCookie } from "../../utils/cookieUtils";

const LoginSignup = ({ onClose }) => {
  const navigate = useNavigate();
  const [islogin, setIslogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleToggle = () => {
    setIslogin(!islogin);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_]).{8,15}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const newUserInfo = {
    email,
    password,
    username,
  };

  const userInfo = {
    email,
    password,
  };

  // 회원가입 통신
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (data.status === 200) {
        alert("회원가입에 성공했습니다. 로그인을 한 뒤 게임을 즐기세요!");
        setIslogin(true);
      }
    },
    onError: (error) => {
      console.error("회원가입 실패 : ", error);
    },
  });

  // 로그인 통신
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const refreshToken = data.data;
      const accessToken = data.headers.authorization;
      if (data.status === 200) {
        setLocalStorage(accessToken);
        setCookie("refreshToken", refreshToken);
        // alert(`${data.data}님 로그인 성공하였습니다. 메인페이지로 이동합니다!`);
        navigate("/main");
      }
    },
    onError: (error) => {
      console.log("로그인 실패 : ", error.status);
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() !== "" && !validateEmail(email)) {
      alert("유효한 이메일 주소를 입력하세요.");
    }

    if (password.trim() !== "" && !validatePassword(password)) {
      alert(
        "비밀번호는 영어 대소문자, 특수문자 !@#$%^&*()_만 사용하여 8~15자로 입력하세요."
      );
    }

    if (islogin) {
      // 로그인 처리
      loginMutation.mutate(userInfo);
    } else {
      // 회원가입 처리
      signupMutation.mutate(newUserInfo);
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
              value={email}
              onChange={handleEmailChange}
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
                  value={username}
                  onChange={handleUsernameChange}
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
