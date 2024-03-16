import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../utils/storageUtils";
import { getCookie } from "../utils/cookieUtils";

// 토큰이 필요 없는 경우
export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 토큰이 필요한 경우
export const authInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 로그인 할 때 token 처리를 interceptor로 해야함
authInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//refresh token api
// export const postRefreshToken = async () => {
//   const response = await authInstance.post("/auth/refresh", {
//     refreshToken: getCookie("refreshToken"),
//   });
//   console.log(response);
//   return response;
// };

/*TODO - accessToken이 만료되었을 경우 refreshToken을 발급받아서 accessToken에 갈아끼워 넣는다.*/
authInstance.interceptors.response.use(
  console.log("TEST"),
  console.log(getCookie("refreshToken")),
  // console.log(response),
  // response 특이사항 없을 시 패스
  (response) => response
  // 에러 발생 시 토큰 만료된 경우로 새로운 토큰 발급하는 역할
  //  console.error("1");
  // async (error) => {
  //   console.log(error);
  //   const refreshToken = getCookie("refreshToken");
  //   const data = await instance.post("/auth/refresh", refreshToken);
  //   console.log(data);
  //   const { accessToken } = data.refreschToken;
  //   localStorage.setItem(accessToken);
  //   return error;
  // }
);
