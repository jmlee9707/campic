import API from "./index";

// 포토 등록
// eslint-disable-next-line import/prefer-default-export
export const writePhoto = async body => {
  console.log("111111");
  const res = await API.post("/photo", body); // POST날릴거임
  console.log(res.data);
  return res.data;
};


// 포토상세
export const getPhotoDetail = async boardId => {
  const res = await API.get(`/photo/${boardId}`);
  return res.data;
};
