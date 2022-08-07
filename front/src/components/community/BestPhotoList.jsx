import React from "react";
import BestPhoto from "./BestPhoto";
import "./BestPhoto.scss";

function BestPhotoList() {
  return (
    <div className="piclist flex">
      <BestPhoto />
      <BestPhoto />
      <BestPhoto />
      <BestPhoto />
    </div>
  );
}

export default BestPhotoList;
