import { createSlice } from "@reduxjs/toolkit";

export const initialUserState = {
  value: {
    userName: "",
    email: "",
    nickname: "",
    password: null,
    tel: "",
    birth: "",
    profileImg: "img",
    joinDate: "",
    auth: "USER",
    accessToken: null
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    reset: state => {
      state.value = initialUserState.value;
      // Object.assign(state, initialUserState);
    },
    findId: (state, action) => {
      state.value = action.payload;
    },
    findPw: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { login, reset, findId, findPw } = userSlice.actions;

export default userSlice.reducer;
