import { createSlice } from "@reduxjs/toolkit";

export const initialshoppingState = {
  arrange: 0,
  page: 0,
  shoppingList: [],
  top5: [],
  searchKeyword: "",
  isEnd: false,
};

const shoppingReducer = createSlice({
  name: "shopping",
  initialState: initialshoppingState,
  reducers: {
    reset: state => {
      Object.assign(state, initialshoppingState);
    },
    setShoppingList: (state, { payload }) => {
      if (payload.shoppingList.length < 10) {
        state.isEnd = true;
      }
      state.shoppingList = [...state.shoppingList, ...payload.shoppingList];
      state.page += 1;
    },
    setfirstShoppingList: (state, { payload }) => {
      if (payload.shoppingList.length < 10) {
        state.isEnd = true;
      }
      state.shoppingList = [...payload.shoppingList];
      state.page = 0;
    },
    setTop5: (state, { payload }) => {
      state.top5 = payload.top5;
    },
    setSearchKeyword: (state, { payload }) => {
      state.searchKeyword = payload.searchKeyword;
    },
  }
});


export const {
  reset,
  setfirstShoppingList,
  setShoppingList,
  setTop5,
  setSearchKeyword,
} = shoppingReducer.actions;
export default shoppingReducer.reducer;
