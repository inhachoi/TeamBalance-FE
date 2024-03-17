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
export const postRefreshToken = async () => {
  try {
    const data = await authInstance.post("/auth/refresh", {
      refreshToken: getCookie("refreshToken"),
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("토큰 갱신 중 오류 발생:", error);
    throw error; // 필요한 경우 에러를 다른 곳에서 처리하기 위해 에러를 다시 던집니다.
  }
};

/*TODO - accessToken이 만료되었을 경우 refreshToken을 발급받아서 accessToken에 갈아끼워 넣는다.*/
authInstance.interceptors.response.use(
  (response) => {
    console.log("응답 인터셉트됨:", response, new Date());
    return response;
  },
  async (error) => {
    console.error("응답 오류 인터셉트됨:", error);
    if (error.response) {
      try {
        // 토큰을 새로 고칩니다.
        const data = await postRefreshToken();
        console.log("새로 고친 토큰 데이터:", data);
        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        // 새 토큰을 사용하여 원래의 요청을 다시 보냅니다.
        const originalRequest = error.config;
        originalRequest.headers.Authorization = accessToken;
        return authInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰을 새로 고치는 중 오류 발생:", refreshError);
        return Promise.reject(error); // 원래의 요청에 대한 오류를 반환합니다.
      }
    }
    return Promise.reject(error);
  }
);
