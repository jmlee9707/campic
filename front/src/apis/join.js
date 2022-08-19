import { API } from "./index";

export const duplicateEmail = async userId => {
  const res = await API.get(`email/send/${userId}`);
  return res.data;
};

export const join = async body => {
  const res = await API.post("/user/register", body);
  return res.data;
};

export const ex = () => {};
