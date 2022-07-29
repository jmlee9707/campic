import axios from "axios";

const BASE_URL = "http://i7C109.p.ssafy.io:8081/";

const API = axios.create({
  baseURL: BASE_URL, // 기본 서버 URL
  headers: {
    // 자신이 매번 전달해야 하는 객체가 자동으로 삽입된다.
    "Content-Type": "multipart/form-data"
  }
});

export default API;
