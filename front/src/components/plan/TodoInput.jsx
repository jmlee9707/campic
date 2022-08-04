import React, { useState, useRef } from "react";
// import { addTodo } from "@store/plan";
// import { useDispatch } from "react-redux";
import check from "@images/icon/done_black.svg";

function TodoInput() {
  const inputRef = useRef();
  const [text, setText] = useState("");

  //   const dispatch = useDispatch();

  const onChangeInput = () => {
    setText(inputRef.current.value);
  };
  const onClickTodo = () => {
    // dispatch(addTodo({ text }));
    setText("");
    inputRef.current.focus(); // input 으로 포커싱
  };
  return (
    <div className="plan_detail_box_left_input flex align-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="TODO-LIST를 작성해 보세요!!"
        className="fs-16 notoMid"
        onChange={onChangeInput}
        value={text}
      />
      <button
        onClick={onClickTodo}
        type="submit"
        className="submit flex justify-center align-center"
      >
        <img src={check} alt="coverImg" />
      </button>
    </div>
  );
}

export default TodoInput;
