import React from "react";
import "./BestPhoto.scss";

import friends from "@images/friend.jpeg";

function BestPhoto() {
  return (
    <div className="bestPhoto">
      <img src={friends} alt="베스트이미지" />
    </div>
  );
}

export default BestPhoto;
