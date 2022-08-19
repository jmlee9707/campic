import { createSlice } from "@reduxjs/toolkit";

export const initialCampState = {
  arrange: 1,
  page: 0,
  campList: [],
  keyword: null,
  tag: [],
  sido: null,
  gugun: null,
  lati: 37.547889,
  longi: 126.997128
};

const campReducer = createSlice({
  name: "campSearch", 
  initialState: initialCampState,
  reducers: {
    // 초기화
    reset: state => {
      state.page = initialCampState.page;
      state.campList = initialCampState.campList;
    },
    resetLoca: state => {
      state.sido = initialCampState.sido;
      state.gugun = initialCampState.gugun;
    },
    setCampList: (state, { payload }) => {
      state.campList = [...state.campList, ...payload.campList];
      state.page += 1; 
    },
    setTagConditions: (state, { payload }) => {
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
