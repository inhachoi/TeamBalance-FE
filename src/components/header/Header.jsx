import React from "react";
import logoImg from "../../img/logo.png";
import {
  HeaderBar,
  HeaderLogo,
  HeaderRightBar,
  HeaderNickName,
  HeaderLogoutButton,
} from "./Heder.module";

const Header = () => {
  return (
    <HeaderBar>
      <HeaderLogo src={logoImg} />
      <HeaderRightBar>
        <HeaderNickName>AA님</HeaderNickName>
        <HeaderLogoutButton>로그아웃</HeaderLogoutButton>
      </HeaderRightBar>
    </HeaderBar>
  );
};

export default Header;
