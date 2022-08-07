import React from "react";
// import check from "@images/icon/done_black.svg";
import checkGray from "@images/icon/done_gray.svg";

function TodoEach() {
  const task = "todotodotodotodoto";
  return (
    <div className="todo_box flex align-center ">
      <button type="button" className="flex justify-center align-center">
        <img src={checkGray} alt="coverImg" />
      </button>
      <div className="">
        <p className="fs-14 notoMid">{task}</p>
      </div>
    </div>
  );
}

export default TodoEach;
