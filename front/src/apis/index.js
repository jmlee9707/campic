import axios from "axios";
// import { useDispatch } from "react-redux";
// axios instance 생성
const BASE_URL = "http://i7C109.p.ssafy.io:8081/";

export const API = axios.create({
  baseURL: BASE_URL, // 기본 서버 url
  headers: {}
});

export const API_USER = axios.create({
  baseURL: BASE_URL, // 기본 서버 url
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8081",
    Authorization: `Bearer-${sessionStorage.getItem("accessToken")}`
    // "withCredentials": true
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
        url: "http://i7C109.p.ssafy.io:8081/token/silentRefresh",
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
