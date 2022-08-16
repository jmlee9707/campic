import { createSlice } from "@reduxjs/toolkit";

export const initialCampState = {
  arrange: 1,
  page: 0,
  campList: [],
  keyword: null,
  tag: [],
  sido: null,
  gugun: null,
  lati: null,
  longi: null
};

// camp store 생성
const campReducer = createSlice({
  name: "campSearch", // action type으로 사용될 이름
  initialState: initialCampState,
  reducers: {
    // 초기화
    reset: state => {
      state.page = initialCampState.page;
      state.campList = initialCampState.campList;
      // Object.assign(state.page, initialCampState.page);
      // Object.assign(state.campList, initialCampState.campList);
      // // Object.assign(state, initialCampState);
    },
    resetLoca: state => {
      state.sido = initialCampState.sido;
      state.gugun = initialCampState.gugun;
    },
    setCampList: (state, { payload }) => {
      state.campList = [...state.campList, ...payload.campList];
      state.page += 1; // 페이지 하나씩 증가
    },
    setTagConditions: (state, { payload }) => {
      // state.tag = [...state.tag, payload];
      state.tag = payload;
    },
    setLocaConditions: (state, { payload }) => {
      state.sido = payload.sido;
      state.gugun = payload.gugun;
    },
    setKeyword: (state, { payload }) => {
      state.keyword = payload;
    },
    setArrangeConditions: (state, { payload }) => {
      state.arrange = payload.arrange;
    },
    setLocation: (state, { payload }) => {
      state.lati = payload.lati;
      state.longi = payload.longi;
    }
  }
});
export const selectLocation = state => state.campSearch;

export const {
  reset,
  resetLoca,
  setCampList,
  setTagConditions,
  setLocaConditions,
  setLocation,
  setArrangeConditions,
  setKeyword
} = campReducer.actions;
export default campReducer.reducer;
