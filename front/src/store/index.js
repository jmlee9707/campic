import { configureStore } from "@reduxjs/toolkit"; // 스토어 선언
import photoReducer from "./photo";

// 객체 전달, 하나의 거대한 store, 모든 state를 관리한다.
const store = configureStore({
  // root reducer
  reducer: { photos: photoReducer }
});

export default store;
