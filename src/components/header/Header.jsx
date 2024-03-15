import React from "react";
import logoImg from "../../img/logo.png";
import {
  HeaderBar,
  HeaderLogo,
  HeaderRightBar,
  HeaderNickName,
  HeaderLogoutButton,
} from "./Heder.module";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../axios/LoginSignupAxios";
import { removeCookie } from "../../utils/cookieUtils";
import { removeLocalStorage } from "../../utils/storageUtils";

const Header = () => {
  const navigate = useNavigate();

  const logoutMutaion = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      console.log("로그아웃 성공 : ", data);
      removeCookie("refreshToken");
      removeLocalStorage("accessToken");
      navigate("/");
      // if (data.status === 200) {
      // }
    },
    onError: (error) => {
      console.log("로그아웃 실패 ", error);
    },
  });
  //
  const handleLogiutClick = () => {
    // removeCookie 쿠키 또는 로컬스토리지 토큰 삭제
    logoutMutaion.mutate();
  };

  return (
    <HeaderBar>
      <HeaderLogo src={logoImg} />
      <HeaderRightBar>
        <HeaderNickName>AA님</HeaderNickName>
        <HeaderLogoutButton onClick={handleLogiutClick}>
          로그아웃
        </HeaderLogoutButton>
      </HeaderRightBar>
    </HeaderBar>
  );
};

export default Header;
