import { createSlice } from "@reduxjs/toolkit";

// todo store 생성
const todoReducer = createSlice({
  name: "todos", // action type으로 사용될 이름
  initialState: [
    {
      id: "",
      text: "",
      completed: false
    }
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload.text
        // completed: false
      };
      state.push(newTodo);
    }
  }
});

export const { addTodo } = todoReducer.actions;
export default todoReducer.reducer;
