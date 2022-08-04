import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import todoReducer from "./plan";

//-----------------------------------------------------------------
// 객체 전달, 하나의 거대한 store, 모든 state 관리
const store = configureStore({
  // root reducer
  reducer: { todos: todoReducer, user: userReducer }
});

export default store;
