import API from "./index";

// 플랜 추가하기
export const addPlan = async (
  campId,
  email,
  startDate,
  endDate,
  savedTitle
) => {
  //   console.log("Aaaa");
  const res = await API.post(
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
  const res = await API.get(`schedule/${saveId}`);
  return res.data;
};

// todoList 조회하기
export const getTodo = async saveId => {
  const res = await API.get(`/schedule/${saveId}/todo`);
  return res.data;
};

// todolist 추가하기
export const addTodo = async (saveId, body) => {
  const res = await API.post(`/schedule/${saveId}/todo`, body);
  return res.data;
};

export const ex = () => {};
