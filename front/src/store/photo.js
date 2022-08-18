import { createSlice } from "@reduxjs/toolkit";

export const initialPhotoState = {
  page: 0,
  photoList: [],
  isEnd: false
};

const photoReducer = createSlice({
  name: "photo",
  initialState: initialPhotoState,
  reducers: {
    reset: state => {
      Object.assign(state, initialPhotoState);
    },
    setPhotoList: (state, { payload }) => {
      if (payload.photoList.length < 15) {
        state.isEnd = true;
      }
      state.photoList = [...state.photoList, ...payload.photoList];
      state.page = 0;
    }
  }
});

export const {
  reset,
  setfirstPhotoList,
  setPhotoList
} = photoReducer.actions;

export default photoReducer.reducer;
