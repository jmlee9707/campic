import axios from "axios";

export const BASE_URL = "https://campic.site:8080";

export const API = axios.create({
  baseURL: BASE_URL, 
  headers: {}
});

export const API_USER = axios.create({
  baseURL: BASE_URL, // 기본 서버 url
  headers: {
    "Access-Control-Allow-Origin": "https://campic.site:8080",
    Authorization: `Bearer-${sessionStorage.getItem("accessToken")}`
  }
});

export const API_PHOTO = axios.create({
  baseURL: BASE_URL, // 기본 서버 URL
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

API_USER.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response.status === 401 &&
      error.response.data.error === "Unauthorized"
    ) {
      const refreshToken = await sessionStorage.getItem("refreshToken");
      const res = await axios({
        url: "https://campic.site:8080/token/silentRefresh",
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          refreshToken: `Bearer-${refreshToken}`
        }
      });
      const originRequest = error.config;
      originRequest.headers.Authorization = `Bearer-${res.data.accessToken}`;

      sessionStorage.setItem("accessToken", res.data.accessToken);
      sessionStorage.setItem("refreshToken", res.data.refreshToken);
      return axios(originRequest);
    }
    return Promise.reject(error);
  }
);
export const ex = () => {};

