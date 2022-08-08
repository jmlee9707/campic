import { API_USER } from "./index";

// 플랜 추가하기
export const addPlan = async (
  campId,
  email,
  startDate,
  endDate,
  savedTitle
) => {
  //   console.log("Aaaa");
  const res = await API_USER.post(
    `/camp/${campId}`,
    { startDate, endDate, savedTitle },

    {
      params: {
        email
      }
    }
    // { data: startDate, endDate, savedTitle }
  );
  console.log(res.data);
  return res.data;
};

export const getPlanDetail = async saveId => {
  const res = await API_USER.get(`schedule/${saveId}`);
  return res.data;
};

// todoList 조회하기
export const getTodo = async saveId => {
  const res = await API_USER.get(`/schedule/${saveId}/todo`);
  return res.data;
};

// todolist 추가하기
export const addTodo = async (saveId, body) => {
  const res = await API_USER.post(`/schedule/${saveId}/todo`, body);
  return res.data;
};
// 다가올 캠핑 조회하기
export const getUpcomingPlan = async (email, now) => {
  const res = await API_USER.get(
    `/schedule/upcomming?email=${email}&now=${now}`
    // "/schedule/upcoming",
    // {
    //   params: { email, now }
    // }
  );
  // console.log(res.data);
  return res.data;
};
// 지나간 캠핑 조회하기
export const getEndPlan = async (email, now) => {
  const res = await API_USER.get(
    `/schedule/endlist?email=${email}&now=${now}`
    // "/schedule/upcoming",
    // {
    //   params: { email, now }
    // }
  );
  console.log(res.data);
  return res.data;
};

export const ex = () => {};