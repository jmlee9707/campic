import { createSlice } from "@reduxjs/toolkit";

export const initialPhotoState = {
  value: {
    img: "",
    content: "",
    tag: ""
  }
};

export const photoSlice = createSlice({
  name: "photo",
  initialState: initialPhotoState,
  reducers: {
    write: (state, action) => {
      state.value = action.payload;
    },
    reset: state => {
      Object.assign(state, initialPhotoState) // 포토스테이트 초기값으로 할당
    }
  }
});

export const {write, reset} = photoSlice.actions;

export default photoSlice.reducer;
