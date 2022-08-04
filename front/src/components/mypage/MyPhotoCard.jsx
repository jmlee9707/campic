import React from "react";
import "./MyPhotoCard.scss";

import coco from "@images/coco.jpeg";

function PhotoCard() {
  return (
    <div className="photoCard">
      <img src={coco} alt="베스트이미지" />
    </div>
  );
}

export default PhotoCard;
