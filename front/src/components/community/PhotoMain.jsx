import React from "react";
import "./PhotoMain.scss";

import friends from "@images/friend.jpeg";

function PhotoMain() {
  return (
    <div className="MainPhoto">
      <img src={friends} alt="베스트이미지" />
    </div>
  );
}

export default PhotoMain;
