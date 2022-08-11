import axios from "axios";
// import { useDispatch } from "react-redux";
// axios instance 생성
const BASE_URL = "https://campic.site:8080";

export const API = axios.create({
  baseURL: BASE_URL, // 기본 서버 url
  headers: {}
});

export const API_USER = axios.create({
  baseURL: BASE_URL, // 기본 서버 url
  headers: {
    "Access-Control-Allow-Origin": "https://campic.site:8080",
    Authorization: `Bearer-${sessionStorage.getItem("accessToken")}`
    // "withCredentials": true
  }
});

export const API_PHOTO = axios.create({
  baseURL: BASE_URL, // 기본 서버 URL
  headers: {
    // 자신이 매번 전달해야 하는 객체가 자동으로 삽입된다.
    "Content-Type": "multipart/form-data"
  }
});

API_USER.interceptors.response.use(
  response => response,
  async error => {
    // console.log("에러")
    // console.log(error)
    if (
      error.response.status === 401 &&
      error.response.data.error === "Unauthorized"
    ) {
      // console.log("if문 안쪽")
      const refreshToken = await sessionStorage.getItem("refreshToken");
      // console.log(refreshToken)
      const res = await axios({
        url: "https://campic.site:8080/token/silentRefresh",
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        // withCredentials: true,
        data: {
          // "Access-Control-Allow-Origin": "http://localhost:8082",
          refreshToken: `Bearer-${refreshToken}`
        }
      });
      const originRequest = error.config;
      // console.log(res.data);
      originRequest.headers.Authorization = `Bearer-${res.data.accessToken}`;

      // console.log("다시 보내기위한 에러")
      // console.log(originRequest);
      // console.log(API_USER);
      // dispatch({type: 'user/setLoginInfo', payload: { accessToken: res.accessToken }});
      // originRequest.headers.Authorization = `bearer-${res.accessToken}`;
      sessionStorage.setItem("accessToken", res.data.accessToken);
      sessionStorage.setItem("refreshToken", res.data.refreshToken);
      return axios(originRequest);
    }
    return Promise.reject(error);
  }
);
export const ex = () => {};

// export default API;
