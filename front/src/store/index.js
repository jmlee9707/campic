import { configureStore } from "@reduxjs/toolkit";
import campReducer from "./camp";
import userReducer from "./user";
import todoReducer from "./plan";
import findReducer from "./find";
import photoReducer from "./photo";

//-----------------------------------------------------------------
// 객체 전달, 하나의 거대한 store, 모든 state 관리
const store = configureStore({
  // root reducer
  reducer: {
    campSearch: campReducer,
    todos: todoReducer,
    user: userReducer,
    find: findReducer,
    photos: photoReducer
  }
});

export default store;
