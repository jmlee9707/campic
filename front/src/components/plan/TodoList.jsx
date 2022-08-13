import React, { useRef, useState, useEffect } from "react";
import check from "@images/icon/done_black.svg";
import { useParams } from "react-router-dom";
import TodoEach from "./TodoEach";
import { addTodo, getTodo } from "../../apis/plan";

function TodoList() {
  const todoRef = useRef();
  const [todoList, setTodoList] = useState([]);

  const { id } = useParams();
  // const saveId = 1;

  const addContent = async () => {
    const content = todoRef.current.value;
    // console.log(content);
    const res = await addTodo(id, content);
    setTodoList([...todoList, ...res]);
  };

  useEffect(async () => {
    const res = await getTodo(id);
    setTodoList(res);
  }, [todoList]);

  return (
    <>
      <div className="plan_detail_box_left_title notoBold fs-30">TODO-LIST</div>
      <div className="plan_detail_box_left_input flex align-center">
        <input
          ref={todoRef}
          type="text"
          placeholder="TODO-LIST를 작성해 보세요!!"
          className="fs-16 notoMid"
        />
        <button
          onClick={addContent}
          type="button"
          className="flex justify-center align-center"
        >
          <img src={check} alt="coverImg" />
        </button>
      </div>
      <div className="plan_detail_box_left_list">
        <TodoEach />
      </div>
    </>
  );
}

export default TodoList;
