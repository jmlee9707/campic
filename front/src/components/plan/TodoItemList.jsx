import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addTodo } from "@store/plan";

// import checkGray from "@images/icon/done_gray.svg";
import TodoInput from "@components/plan/TodoInput";
import TodoItem from "@components/plan/TodoItem";

function TodoItemList() {
  // const dispatch = useDispatch();
  // const todos = useSeletor(state => state.todos);

  return (
    <>
      <div className="plan_detail_box_left_title notoBold fs-30">TODO-LIST</div>
      <TodoInput />
      {/* 투두 리스트 개별 */}
      <div className="plan_detail_box_left_list">
        {/* {todos && todos.map(todo => <TodoItem text={todo.text} />)} */}
        <TodoItem />
      </div>
    </>
  );
}

export default TodoItemList;
