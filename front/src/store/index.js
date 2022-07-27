import { configureStore } from "@reduxjs/toolkit"; // 스토어 선언
import photoReducer from "./photo";

const store = configureStore({
  reducer: { photos: photoReducer }
});

export default store;
