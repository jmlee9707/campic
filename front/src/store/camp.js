import { createSlice } from "@reduxjs/toolkit";

export const initialCampState = {
  page: 0,
  campList: [1],
  keyword: null,
  tag: [],
  sido: null,
  gugun: null
};

// camp store 생성
const campReducer = createSlice({
  name: "campSearch", // action type으로 사용될 이름
  initialState: initialCampState,
  reducers: {
    // 초기화
    reset: state => {
      state.page = initialCampState.page;
      // state.campList = initialCampState.campList;
      state.campList = [0];
    },
    setCampList: (state, { payload }) => {
      // console.log(payload);
      state.campList = [...state.campList, payload];
      state.page += 1; // 페이지 하나씩 증가
    },
    setTagConditions: (state, { payload }) => {
      // state.tag = [...state.tag, payload];
      console.log(payload);
      state.tag = payload;
    },
    setLocaConditions: (state, { payload }) => {
      state.sido = payload.sido;
      state.gugun = payload.gugun;
    }
  }
});

export const { reset, setCampList, setTagConditions, setLocaConditions } =
  campReducer.actions;
export default campReducer.reducer;
