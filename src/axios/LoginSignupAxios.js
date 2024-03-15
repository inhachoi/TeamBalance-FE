import { instance } from "./api";

export const signupUser = async (newUserInfo) => {
  console.log(newUserInfo);
  try {
    const response = await instance
      .post("/user/signup", newUserInfo)
      .then((response) => response);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
  }
};

export const loginUser = async (userInfo) => {
  try {
    const response = await instance
      .post("/user/login", userInfo)
      .then((response) => response);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
  }
};

export const logoutUser = async () => {
  try {
    const response = await instance
      .post("/user/logout")
      .then((response) => response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
