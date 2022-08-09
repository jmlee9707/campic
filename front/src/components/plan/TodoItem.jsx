import React, { useState } from "react";
import { useSelector } from "react-redux";
import check from "@images/icon/done_black.svg";
import checkGray from "@images/icon/done_gray.svg";
import { deleteTodo, modifyTodo } from "../../apis/plan";

function TodoItem({ task, done, saveId, todoId, writer }) {
  const [isDone, setIsDone] = useState(done);
  const userId = useSelector(state => state.user.email);

  const changeState = async () => {
    await modifyTodo(todoId, task, isDone, saveId);
    setIsDone(!isDone);
  };
  const deleteTask = async () => {
    await deleteTodo(todoId, saveId);
  };

  return (
    <div className="todo_box flex align-center ">
      <div>
        {isDone && (
          <button
            onClick={changeState}
            type="button"
            className="todo_box_btn_done flex justify-center align-center"
          >
            <img src={check} alt="coverImg" />
          </button>
        )}
      </div>
      <div>
        {!isDone && (
          <button
            onClick={changeState}
            type="button"
            className="todo_box_btn_yet flex justify-center align-center"
          >
            <img src={checkGray} alt="coverImg" />
          </button>
        )}
      </div>
      <div className="todo_box_content">
        <div
          className={
            isDone
              ? "fs-14 notoMid todo_box_content_text_done"
              : "fs-14 notoMid todo_box_content_text_yet"
          }
        >
          {task}
        </div>

        {userId === writer && (
          <button
            onClick={deleteTask}
            type="button"
            className="todo_box_content_delete fs-14 notoMid"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
