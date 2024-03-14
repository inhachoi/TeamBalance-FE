import styled from "styled-components";

const HeaderBar = styled.div`
  background-color: ${(props) => props.theme.color.black};
  width: 100%;
  height: 50px;
  display: flex;
  color: ${(props) => props.theme.color.white};
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
`;

const HeaderRightBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
`;

const HeaderNickName = styled.div`
  padding-right: 10px;
  font-size: 12px;
  font-weight: bold;
`;

const HeaderLogoutButton = styled.button`
  background-color: ${(props) => props.theme.color.purple};
  color: ${(props) => props.theme.color.white};
  padding: 0px 10px;
  width: 75px;
  height: 25px;
  border-radius: 10px;
  border-style: none;
`;

const HeaderLogo = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 60px;
  height: 25px;
`;

export {
  HeaderBar,
  HeaderLogo,
  HeaderNickName,
  HeaderLogoutButton,
  HeaderRightBar,
};
