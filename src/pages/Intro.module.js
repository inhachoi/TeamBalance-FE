import styled from "styled-components";
import Modal from "react-modal";
// 페이지 전체
const IntroContainer = styled.div`
  display: flex;
`;

// 좌측 칸 스타일
const IntroLeft = styled.div`
  background-color: ${(props) => props.theme.color.gray};
  color: ${(props) => props.theme.color.white};
  height: 100vh;
  width: 100%;
  position: relative;
`;

const IntroLeftContent = styled.div`
  position: absolute;
  top: 25%;
  left: 20%;
  gap: 25px;
`;

const IntroTitle = styled.div`
  background-color: ${(props) => props.theme.color.gray};
  color: ${(props) => props.theme.color.white};
  font-size: 36px;
  margin-top: 25px;
  padding: 5px;
`;

const IntroTitleA = styled.span`
  background-color: ${(props) => props.theme.color.purple};
  color: ${(props) => props.theme.color.black};
  border-radius: 5px;
  padding: 5px;
`;

const IntroTitleB = styled.span`
  padding: 5px;
  color: ${(props) => props.theme.color.purple};
`;

const IntroSubTitle = styled.div`
  font-size: 25px;
  margin-top: 25px;
  padding: 5px;
`;

// 우측 칸 스타일
const IntroRight = styled.div`
  background-color: ${(props) => props.theme.color.navy};
  color: ${(props) => props.theme.color.white};
  width: 80%;
  position: relative;
`;

const LoginButton = styled.button`
  background-color: ${(props) => props.theme.color.white};
  padding: 10px;
  margin: 15px;
  border-radius: 5px;
  color: ${(props) => props.theme.color.purple};
  font-size: 12px;
  position: absolute;
  top: 10px;
  right: 15px;
  width: 70px;
  border-style: none;
`;

const IntroRightContent = styled.div`
  top: 70px;
  position: relative;
  margin-top: 70px;
`;

const IntroRightFirstContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin: 20px;
    font-size: 30px;
  }
`;

const IntroRightChoiceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroRightChoise = styled.div`
  background-color: ${(props) =>
    props.gray ? props.theme.color.gray : props.theme.color.purple};
  color: ${(props) => props.theme.color.white};
  border-radius: 50px;
  text-align: center;
  width: 170px;
  height: 200px;
  margin: 20px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroRightSecondContent = styled.div`
  margin: 100px 50px;
  p {
    margin: 25px;
    font-size: 24px;
  }
`;

const IntroRightCategoryBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const IntroRightCategory = styled.div`
  background-color: ${(props) => props.theme.color.lightGray};
  color: ${(props) => props.theme.color.black};
  border-radius: 25px;
  text-align: left;
  width: 140px;
  height: 170px;
  margin: 15px;
  padding: 0px 10px;
  display: flex;
  align-items: left;
  position: relative;
  p {
    font-size: 20px;
    margin: 20px;
  }
`;

const LoginSignupModalOverLay = styled(Modal)`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const IntroRightCategoryImg = styled.img.attrs((props) => ({
  src: props.src,
}))`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 15px;
  height: 15px;

  margin: 15px;
`;

const IntroLogo = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 65px;
  height: 30px;
  transform: rotate(345deg);
`;

export {
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
  IntroRightCategoryBox,
  IntroRightCategory,
  IntroRightCategoryImg,
  LoginSignupModalOverLay,
};
