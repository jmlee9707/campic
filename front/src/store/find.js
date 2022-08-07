import { createSlice } from "@reduxjs/toolkit";

export const initialUserState = {
  email: null,
};

export const userSlice = createSlice({
  name: "find",
  initialState: initialUserState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    reset: state => {
      Object.assign(state, initialUserState);
    },
  }
});
export const selectEmail = (state) => state.find.email;

export const { 
  reset,
  setEmail,    
} = userSlice.actions;


export default userSlice.reducer;
