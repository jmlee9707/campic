import React from "react";
import "./MyPhotoCard.scss";

// import coco from "@images/coco.jpeg";

function MyPhotoCard({blobFile}) {
  return (
    <div className="photoCard">
      <img src={[blobFile]} alt="내 이미지" />
    </div>
  );
}

export default MyPhotoCard;
