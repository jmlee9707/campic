import {API} from "./index";

// TALK Regist
export const writeTalk = async body => {
  const res = await API.post("/talk", body, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};
// TALK Detail
export const getTalkDetail = async talkId => {
  const res = await API.get(`/talk/detail/${talkId}`);
  return res.data;
};
// Writer Profile
export const getWriterProfile = async email => {
  const res = await API.get(`/user/profile/${email}`);
  return res.data;
};
// TALK IF Like
export const isTalkLike = async params => {
  const res = await API.get(
    `/talk/detail/isLiked?talkId=${params.talkId}&email=${params.email}`,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};
// TALK Like
export const talkLike = async params => {
  const res = await API.post(
    `/talk/like?talkId=${params.talkId}&email=${params.email}`,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};
// TALK DisLike
export const talkDisLike = async params => {
  const res = await API.delete(
    `/talk/like?talkId=${params.talkId}&email=${params.email}`
  );
  return res.data;
};
// TALK Update
export const updateTalk = async body => {
  const res = await API.put("/talk", body, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};
// TALK Delete
export const talkDelete = async params => {
  const res = await API.delete(`/talk/${params.talkId}`);
  return res.data;
};
// TALK Home
export const getTalk = async page => {
  const res = await API.get("/talk",
  {
    params: {
      page
    }
  });
  return res.data;
};
// TALK Best
export const getTalkBest = async () => {
  const res = await API.get("/talk/best", {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};
// User TALK
export const getMyTalk = async email => {
  const res = await API.get(`talk/${email}`);
  return res.data;
};
// User Profile
export const getTalkProfile = async params => {
  const res = await API.get(`user/profile/${params}`);
  return res.data;
};
// Comment Regist
export const writeComment = async (talkId, body) => {
  const res = await API.post(`/talk/comments/${talkId}`, body);
  return res.data;
};
// Comment GET
export const getComment = async talkId => {
  const res = await API.get(`/talk/comments/${talkId}`);
  return res.data;
};
// Comment Update
export const updateComment = async (commentId, body) => {
  const res = await API.put(`/talk/comments/${commentId}`, body);
  return res.data;
};
// Comment Delete
export const deleteComment = async (commentId, body) => {
  const res = await API.put(`talk/comments/${commentId}`, body);
  return res.data;
};
