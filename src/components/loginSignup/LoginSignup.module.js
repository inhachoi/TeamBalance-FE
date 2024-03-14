import styled from "styled-components";

const LoginSignupContainer = styled.div`
  width: 350px;
  height: 500px;
  background-color: ${(props) => props.theme.color.white};

  border-radius: 25px;
  border: 1px solid ${(props) => props.theme.color.lightGray};

  position: relative;
`;
const LoginSignupCloseButton = styled.button`
  border-style: none;
  background-color: ${(props) => props.theme.color.white};
  font-size: 25px;
  border-radius: 50px;

  position: absolute;
  top: 10px;
  right: 10px;
`;

const LoginSignupContent = styled.div`
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 20px;
    font-weight: bold;
  }
`;
const LoginSignupForm = styled.form`
  width: auto;
  display: flex;
  flex-direction: column;
  p {
    font-size: 12px;
    text-align: left;
  }
`;

const LoginSignupInput = styled.input`
  width: 200px;
  height: 40px;
  border-radius: 25px;
  padding-left: 5px;
  border: 1px solid ${(props) => props.theme.color.lightGray};
`;

const LoginSignupChange = styled.div`
  padding-top: 10px;
  p {
    font-size: 16px;
    font-weight: normal;
  }

  button {
    border-style: none;
    background-color: ${(props) => props.theme.color.white};
    font-size: 16px;
    color: ${(props) => props.theme.color.purple};
  }
`;

const LoginSignupButton = styled.button`
  background-color: ${(props) =>
    props.children === "로그인"
      ? props.theme.color.black
      : props.theme.color.purple};

  color: ${(props) =>
    props.children === "로그인"
      ? props.theme.color.white
      : props.theme.color.black};

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  margin-top: 10%;

  width: 200px;
  height: 40px;

  border-radius: 10px;
  border-style: none;
`;

export {
  LoginSignupContainer,
  LoginSignupCloseButton,
  LoginSignupContent,
  LoginSignupForm,
  LoginSignupInput,
  LoginSignupChange,
  LoginSignupButton,
};
