import API from "./index";

// 포토 등록
// eslint-disable-next-line import/prefer-default-export
export const writePhoto = async body => {
  const res = await API.post("/photo", body); // POST날릴거임
  console.log(res.data);
  return res.data;
};

// 포토상세
export const getPhotoDetail = async boardId => {
  console.log("1111");
  const res = await API.get(`/photo/detail/${boardId}`);
  console.log(res.data);
  return res.data;
};

// 좋아요
export const photoLike = async params => {
  console.log("22222");
  console.log(params);
  const res = await API.post(
    `/photo/like?boardId=${params.boardId}&email=${params.email}`
  );
  return res.data;
};

// 좋아요 취소
export const photoDisLike = async params => {
  const res = await API.delete(
    `/photo/like?boardId=${params.boardId}&email=${params.email}`
  );
  return res.data;
};

// 포토 메인페이지 컴포넌트
export const getPhoto = async () => {
  const res = await API.get("/photo");
  return res.data;
};

// 포토 메인페이지 베스트포토 컴포넌트
export const getBestPhoto = async () => {
  const res = await API.get("/photo/best");
  return res.data;
};
