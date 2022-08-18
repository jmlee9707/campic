import { API } from "./index";

// 캠핑장 전체 리스트 불러오기
export const getCamplist = async body => {
  const res = await API.post("/camp", body);
  return res.data;
};

// 캠핑장 상세페이지 불러오기
export const campDetailInfo = async campId => {
  const res = await API.get(`/camp/${campId}`);
  return res.data;
};


// 캠프 top 5 검색어 가져오기
export const searchBest = async () => {
  const res = await API.get("/camp");
  return res.data;
};

export const searchLocation = async (doName, gunName) => {
  const res = await API.get(`/camp/search/${doName}/${gunName}`);
  return res.data;
};

export const searchTag = async tag => {
  const res = await API.get(`/camp/${tag}`);
  return res.data;
};
export const getSido = async () => {
  const res = await API.get("/region");
  return res.data;
};

export const getGun = async sidocode => {
  const res = await API.get(`/region/sidocode`, {
    params: { sidocode }
  });
  return res.data;
};
export const ex = () => {};
