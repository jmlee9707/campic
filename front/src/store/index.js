import { configureStore } from "@reduxjs/toolkit";
import campReducer from "./camp";
import userReducer from "./user";
import findReducer from "./find";
import photoReducer from "./photo";
import shoppingReducer from "./shopping";
import weatherReducer  from "./weather";


//-----------------------------------------------------------------
// 객체 전달, 하나의 거대한 store, 모든 state 관리
const store = configureStore({
  // root reducer
  reducer: {
    campSearch: campReducer,
    user: userReducer,
    find: findReducer,
    photo: photoReducer,
    shopping: shoppingReducer,
    weather: weatherReducer
  }
});

export default store;
