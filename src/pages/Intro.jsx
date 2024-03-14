import React, { useState } from "react";
import {
  IntroContainer,
  IntroLeft,
  IntroRight,
  IntroLogo,
  IntroTitle,
  IntroTitleA,
  IntroTitleB,
  IntroSubTitle,
  IntroLeftContent,
  LoginButton,
  IntroRightContent,
  IntroRightFirstContent,
  IntroRightChoiceBox,
  IntroRightChoise,
  IntroRightSecondContent,
  IntroRightCategory,
  IntroRightCategoryBox,
  IntroRightCategoryImg,
  LoginSignupModalOverLay,
} from "./Intro.module";
import logoImg from "../img/logo.png";
import heartImg from "../img/heart.png";
import LoginSignup from "../components/loginSignup/LoginSignup";

//SECTION - 사이트 진입시 제일 첫번째로 뜨는 페이지 -> 로그인 유도 페이지
const Intro = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenLoginModalClick = () => {
    setModalIsOpen(true);
  };
  const handleCloseLoginModalClick = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <IntroContainer>
        <IntroLeft>
          <IntroLeftContent>
            <IntroLogo src={logoImg} />
            <IntroTitle>
              <IntroTitleA>다함께 즐기는</IntroTitleA>
              <IntroTitleB>밸런스 게임</IntroTitleB>
            </IntroTitle>
            <IntroSubTitle>124명이 함께 하고 있습니다</IntroSubTitle>
          </IntroLeftContent>
        </IntroLeft>

        <IntroRight>
          <LoginButton onClick={handleOpenLoginModalClick}>로그인</LoginButton>
          <IntroRightContent>
            <IntroRightFirstContent>
              <p>중식중에 뭐가 제일 좋아?</p>
              <IntroRightChoiceBox>
                <IntroRightChoise gray>짜장면</IntroRightChoise>
                <h3>VS</h3>
                <IntroRightChoise purple>짬뽕</IntroRightChoise>
              </IntroRightChoiceBox>
            </IntroRightFirstContent>
            <IntroRightSecondContent>
              <p>최근 밸런스 게임 구경하기</p>
              <IntroRightCategoryBox>
                <IntroRightCategory>
                  <p>여행갈 때 나는? </p>
                  <IntroRightCategoryImg src={heartImg} />
                </IntroRightCategory>
                <IntroRightCategory>
                  <p>태블릿을 산다면? </p>
                  <IntroRightCategoryImg src={heartImg} />
                </IntroRightCategory>
              </IntroRightCategoryBox>
            </IntroRightSecondContent>
          </IntroRightContent>
        </IntroRight>
      </IntroContainer>
      <LoginSignupModalOverLay isOpen={modalIsOpen} contentLabel="Login Modal">
        <LoginSignup onClose={handleCloseLoginModalClick} />
      </LoginSignupModalOverLay>
    </>
  );
};

export default Intro;
