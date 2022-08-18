import { API_USER } from "./index";

// 플랜 추가하기
export const addPlan = async (
  campId,
  email,
  startDate,
  endDate,
  savedTitle
) => {
  const res = await API_USER.post(
    `/camp/${campId}`,
    { startDate, endDate, savedTitle },

    {
      params: {
        email
      }
    }
  );
  return res.data;
};
// 플랜 수장하기
export const changePlan = async (saveId, startDate, endDate, savedTitle) => {
  const res = await API_USER.put(`/schedule/${saveId}`, {
    startDate,
    endDate,
    savedTitle
  });
  return res.data;
};

// 플랜 삭제하기
export const deletePlan = async saveId => {
  const res = await API_USER.delete(`schedule/${saveId}`);
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
export const addTodo = async (todoId, task) => {
  const res = await API_USER.post(`/schedule/${todoId}/todo`, { task });
  return res.data;
};

// todolist 수정하기
export const modifyTodo = async (todoId, task, done, saveId) => {
  const res = await API_USER.put(`/schedule/${saveId}/todo/${todoId}`, {
    task,
    done
  });
  return res.data;
};

// todolist 삭제하기
export const deleteTodo = async (todoId, saveId) => {
  const res = await API_USER.delete(`/schedule/${saveId}/todo/${todoId}`);
  return res.data;
};
// 다가올 캠핑 조회하기
export const getUpcomingPlan = async (email, now) => {
  const res = await API_USER.get(
    `/schedule/upcomming?email=${email}&now=${now}`
  );
  return res.data;
};
// 현재 진행중인 캠핑 조회하기
export const getIngPlan = async (email, now) => {
  const res = await API_USER.get(`/schedule/ongoing?email=${email}&now=${now}`);
  return res.data;
};
// 지나간 캠핑 조회하기
export const getEndPlan = async (email, now) => {
  const res = await API_USER.get(
    `/schedule/endlist?email=${email}&now=${now}`
  );
  return res.data;
};

export const ex = () => {};
