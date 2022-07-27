import API from "./index";

export const findPw = async userId => {
  const res = await API.get(`email/findPw/${userId}`);
  console.log(res.data);
  return res.data;
};

// export const reSendMail  = async body => {
//     const res = await API.get()
// }

// 아이디 찾기
export const findId = async phone => {
  const res = await API.get(`user/findId/${phone}`);
  console.log(res.data);
  return res.data;
};

export const sendCode = async body => {
  const res = await API.post("/user/register", body);
  return res.data;
};
export const ex = () => {};
