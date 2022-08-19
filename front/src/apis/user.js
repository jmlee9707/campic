import { API, API_USER } from "./index";

export const login = async body => {
  const res = await API.post("user/login", body, { headers: {} });
  return res.data;
};
// 아이디 찾기
export const findId = async phone => {
  const res = await API.get(`user/findId/${phone}`, {
    headers: { accessToken: sessionStorage.getItem("accessToken") }
  });
  return res.data;
};

// 비밀번호 찾기
export const findPw = async userId => {
  const res = await API.get(`email/findPw/${userId}`);
  return res.data;
};
// 찾기에서 비밀번호 변경
export const findChangePw = async body => {
  const res = await API.put("user/pw", body);
  return res.data;
};

// 비밀번호 변경하기
export const changePw = async body => {
  const res = await API_USER.put("user/info/pw", body);
  return res.data;
};

// 비밀번호 일치 여부 확인하기
export const checkPw = async body => {
  const res = await API_USER.post("user/info/check", body);
  return res.data;
};

// 회원 탈퇴하기
export const dropUser = async userId => {
  const res = await API_USER.delete(`user/info/${userId}`);
  return res.data;
};

// ================= 마이페이지 ====================

// 마이페이지 회원정보 조회
export const getUserInfo = async userId => {
  const res = await API_USER.get(`user/info/${userId}`);
  return res.data;
};

// 마이페이지 회원정보 수정
export const modifyUserInfo = async body => {
  const res = await API_USER.put("user/info", body);
  return res.data;
};
// 회원 프로필 수정
export const modifyUserProfileImg = async body => {
  const res = await API_USER.put("/user/info/profile", body, { headers : { "Content-Type" : "multipart/form-data" } });
  return res.data;
};

const DEFAULTIMG = "iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANuSURBVHgB7ZuhbmJREIanmxWtrGyr2srK4gAHOJC8As+ERSJBggMcSHDgAAc4cLv73+RuCOmmlHvOP1N2vuQmpOI2/TrMOXPmzM2vP4gTnR/iUHDRJFw0CRdNwkWTcNEkXDQJF03CRZNw0SRcNAkXTcJFk3DRJH6KYQ6HgyyXS5nNZrJYLGSz2SQ/A7e3t/L4+Jg8Ly8v8vb2Jpa5sXgeDZmDwUCGw+FfsZ9xf38v7+/vksvlks/WMCcacnu93tmCT4HkUqmUCLeEKdHdbjcRHYJ8Pi+1Wk2sYEZ0u92WyWQiIUEqqdfrYgETuw5EcmjJAO/sdDpiAXXR4/E4WLr4iNFoFPX956IqervdSr/fl9jgd1y6uIZCVTS+2pAdm/1+n2wXNVEVjbTBAilEM6rVRE+nU0o0pyCqV6uVaKEmGiU1G/xztVATrRFd8/lctPivRO92O9FCTbTGwoQ8rYWfR5NQE43zZDZ3d3eihZpojTPjh4cH0UJN9Ovrq7BBN0YLNdEarSe0vLRQE42vMTNPI1Vp9hXVRGNhKhaLwgJNAE1Ut3doNzGiGtGs3UNUFY2orlQqEptyuazeGVcvWBDVhUJBYoF3a6cNYKIyrFarUWTgnXi3Ba72ugEi2YpkYO4CDdpbuEBzaVMAiytycsx0dAkmr4RBMoSj1XWucAjGdhGCNc5RPsOk6GPQFUE3BufXeI4vOWIngVIehQjKa4uCU8yLvhb8PJqEiybhokm4aBIumoSLJmF6WAjFyvFVrtPiBftonADiwWeLsyspJkSn01cQul6vk+d4AusroHCB8OfnZ3l6elJtXx2jVrDgehYqvrTqi3mhBrLxoIrUEk8VDbmYGcQZhtYVWkQ7ZKPjwpQeXXQ6M4gzC6QES6Sjcoj02Pk9muhLhjK1YAyDRhGddShTi5jDoEFFY/uFeUGNS+YhgfBGoxE0uoOJxkLXarW+XRT/C0jGMGioBTOIaHRDEMnXCGSHaBxnLsGRLqxMp8YADeMQu6XMopvN5tWki4/AEUCIb2sm0V9pnn5nULlmnYnMJDrGoLxVsv6tmURrDkiyyZqnM4m+5tx8StaJLj/4J+GiSbhoEi6ahIsm4aJJuGgSfpuUhEc0CRdNwkWTcNEkXDQJF03CRZNw0SRcNAkXTcJFk3DRJFw0CRdN4jfu06j7peOGKgAAAABJRU5ErkJggg==";
export const exchangeImg = (userRes) => {
  const temp = userRes;
  temp.userInfo.profileImg = DEFAULTIMG;
  return temp;
};
export const ex = () => {};
