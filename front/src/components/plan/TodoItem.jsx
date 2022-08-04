import React, { useState } from "react";
// import PropTypes from "prop-types";
import check from "@images/icon/done_black.svg";
import checkGray from "@images/icon/done_gray.svg";

function TodoItem() {
  const [finished, setFinished] = useState(false);

  const clicked = () => {
    setFinished(!finished);
  };

  return (
    <div className="todo_box flex align-center ">
      <button
        onClick={clicked}
        type="button"
        className={
          finished
            ? "flex justify-center align-center todo_box_done"
            : "flex justify-center align-center todo_box_yet"
        }
      >
        {!finished && <img src={checkGray} alt="coverImg" />}
        {finished && <img src={check} alt="coverImg" />}
      </button>
      <div className="todo_box_text">
        <p
          className={
            finished
              ? "fs-14 notoMid todo_box_text_done"
              : "fs-14 notoMid todo_text_yet"
          }
        >
          {/* {text} */}
        </p>
      </div>
    </div>
  );
}

export default TodoItem;
