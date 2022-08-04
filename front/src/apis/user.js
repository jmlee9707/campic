import { API, API_USER } from "./index";

export const login = async body => {
  const res = await API.post("user/login", body, { headers: {} });
  // setImeout 걸어서 refreshtoken 처리
  //
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
  console.log(res.data);
  return res.data;
};

// export const reSendMail  = async body => {
//     const res = await API.get()
// }

// 비밀번호 변경하기
export const changePw = async body => {
  const res = await API_USER.put("user/info/pw", body);
  console.log(res.data);
  return res.data;
};

// 비밀번호 일치 여부 확인하기
export const checkPw = async body => {
  console.log(API_USER.post());
  const res = await API_USER.post("user/info/check", body);
  return res.data;
};
// export const checkPw = async () => {
//   const res = await Axios.post(
//     "http://i7C109.p.ssafy.io:8081/user/info/check",
//     { headers: { accessToken: sessionStorage.getItem("accessToken") } }
//   );
//   console.log(res.headers.accessToken);
//   return res.data;
// };

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
// // 코드 전송하기
// export const sendCode = async body => {
//   const res = await API.post("/user/register", body);
//   return res.data;
// };

export const ex = () => {};
