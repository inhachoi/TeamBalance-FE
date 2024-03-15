import axios from "axios";
import { getLocalStorage } from "../utils/storageUtils";

// 토큰이 필요 없는 경우
export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 토큰이 필요한 경우
const token = getLocalStorage();
console.log(token);
export const authInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: token,
  },
});

/*TODO - accessToken이 만료되었을 경우 refreshToken을 발급받아서 accessToken에 갈아끼워 넣는다.
이후 새로 받은 refreshToken은 다시 쿠키에 저장해서 가지고 있는다.
*/
// authInstance.interceptors.response.use(
//   // response 특이사항 없을 시 패스
//   (response) => response,
//   // 에러 발생 시 토큰 만료된 경우로 새로운 토큰 발급하는 역할
//   async (error) => {
//     const refreshToken = getCookie("refreshToken");
//     const data = await instance.post("/api/auth/refresh", refreshToken);
//     const { accessToken } = data.refreschToken;
//     localStorage.setItem(accessToken);
//     return error;
//   }
// );

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
