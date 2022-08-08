import { createSlice } from "@reduxjs/toolkit";

export const initialUserState = {
  // accessToken: null,
  auth: null,
  birth: null,
  email: null,
  joinDate: null,
  nickname: null,
  profileImg: null,
  tel: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },
    setUserInfo: (state, action) => {
      state.auth = action.payload.auth;
      state.email = action.payload.email;
      state.birth = action.payload.birth;
      state.joinDate = action.payload.joinDate.substr(0, 10);
      state.nickname = action.payload.nickname;
      state.profileImg = `data:image/png;base64,${action.payload.profileImg}`;
      state.tel = action.payload.tel;
    },
    updateUserInfo: (state, action) => {
      state.birth = action.payload.birth;
      state.nickname = action.payload.nickname;
      state.tel = action.payload.tel;
    },
    reset: state => {
      Object.assign(state, initialUserState);
    },
    // updateAccessToken: (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    // },
    findId: (state, action) => {
      state.value = action.payload;
    },
    findPw: (state, action) => {
      state.value = action.payload;
    }
  }
});
export const selectEmail = (state) => state.user.email;
export const selectProfile = (state) => state.user;

export const { 
  setUserInfo,
  setProfileImg,
  updateUserInfo, 
  reset,
  setEmail,  
  findId, 
  findPw, 
} = userSlice.actions;


export default userSlice.reducer;
