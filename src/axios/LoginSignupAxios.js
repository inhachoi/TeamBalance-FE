import { instance } from "./api";

export const signupUser = async (newUserInfo) => {
  try {
    const response = await instance
      .post("/user/signup", newUserInfo)
      .then((response) => response);
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
    return response;
  } catch (error) {
    console.log(error.response);
  }
};

export const logoutUser = async (refreshToken) => {
  try {
    const response = await instance
      .post("/user/logout", { refreshToken: refreshToken })
      .then((response) => response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
