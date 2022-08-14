import { createSlice } from "@reduxjs/toolkit";

export const initialFindState = {
  email: null,
};

export const userSlice = createSlice({
  name: "find",
  initialState: initialFindState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    reset: state => {
      Object.assign(state, initialFindState);
    },
  }
});
export const selectEmail = (state) => state.find.email;

export const { 
  reset,
  setEmail,    
} = userSlice.actions;


export default userSlice.reducer;
