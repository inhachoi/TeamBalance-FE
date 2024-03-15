import axios from "axios";
import { getLocalStorage } from "../utils/storageUtils";

// 토큰이 필요 없는 경우
export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 토큰이 필요한 경우
const token = getLocalStorage("accessToken");
export const authInstance = axios.create(
  {
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      authorization: token,
    },
  },
  console.log(token)
);

// ! Refresh토큰이 생성 되면 사용할 예정 -> 리프레시 토큰을 재발급해줄때 바디로 보내주는건지 확인 필요
// authInstance.interceptors.response.use(
//   (res) => res, //성공한 경우 걍 결과(result) 내보내줌ㅇㅇ
//   async (error) => {
//     //await가 문제니까 async 붙여주기
//     if (error.response.status === 401) {
//       //토큰이 만료된 경우(instance가 실패했을 경우)
//       const { accessToken } = await getNewRefreshToken();
//       error.config.headers.Authorization = accessToken;
//       localStorage.setItem("accessToken", accessToken); //localStorage update
//       return (await axios.get(error.config.url, error.config)).data;
//     }
//   },
// );
