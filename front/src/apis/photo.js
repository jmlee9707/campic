import { API_PHOTO } from "./index";

// 포토 등록
// eslint-disable-next-line import/prefer-default-export
export const writePhoto = async body => {
  const res = await API_PHOTO.post("/photo", body); // POST날릴거임

  return res.data;
};

// 포토상세
export const getPhotoDetail = async boardId => {
  const res = await API_PHOTO.get(`/photo/detail/${boardId}`);
  return res.data;
};
// 유저 프로필 가져오기
export const getWriterProfile = async email => {
  const res = await API_PHOTO.get(`/user/profile/${email}`);
  return res.data;
};

// 좋아요 유무 파악
export const getIsLiked = async params => {
  const res = await API_PHOTO.get(
    `/photo/detail/isLiked?boardId=${params.boardId}&email=${params.email}`
  );
  return res.data;
};

// 좋아요
export const photoLike = async params => {
  const res = await API_PHOTO.post(
    `/photo/like?boardId=${params.boardId}&email=${params.email}`
  );
  console.log(res.data);
  return res.data;
};

// 좋아요 취소
export const photoDisLike = async params => {
  const res = await API_PHOTO.delete(
    `/photo/like?boardId=${params.boardId}&email=${params.email}`
  );
  return res.data;
};

// 포토 메인페이지 컴포넌트
// photo?page=0
export const getPhoto = async page => {
  const res = await API_PHOTO.get("/photo", {
    params: {
      page
    }
  });
  return res.data;
};

// 포토 메인페이지 베스트포토 컴포넌트
export const getBestPhoto = async () => {
  const res = await API_PHOTO.get("/photo/best");

  return res.data;
};

// 포토 수정
export const updatePhoto = async body => {
  const res = await API_PHOTO.put("/photo", body); // POST날릴거임
  return res.data;
};

// 포토 삭제
export const photoDelete = async params => {
  const res = await API_PHOTO.delete(`/photo/${params.boardId}`);
  return res.data;
};

// 특정 유저 포토 리스트
export const getMyPhoto = async email => {
  const res = await API_PHOTO.get(`/photo/${email}`);

  return res.data;
};