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
import { getCookie, removeCookie } from "../../utils/cookieUtils";
import { removeLocalStorage } from "../../utils/storageUtils";

const Header = () => {
  const navigate = useNavigate();

  const logoutMutaion = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      if (data.status === 200) {
        removeCookie("refreshToken");
        removeLocalStorage("accessToken");
        alert(data.data);
        navigate("/");
      }
    },
    onError: (error) => {
      console.log("로그아웃 실패 ", error);
    },
  });

  const handleLogOutClick = () => {
    const refreshToken = getCookie("refreshToken");
    logoutMutaion.mutate(refreshToken);
  };

  return (
    <HeaderBar>
      <HeaderLogo src={logoImg} />
      <HeaderRightBar>
        <HeaderNickName>AA님</HeaderNickName>
        <HeaderLogoutButton onClick={handleLogOutClick}>
          로그아웃
        </HeaderLogoutButton>
      </HeaderRightBar>
    </HeaderBar>
  );
};

export default Header;
