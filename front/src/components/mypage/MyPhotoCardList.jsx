import React from "react";
import PhotoCard from "./MyPhotoCard";
import "./MyPhotoCard.scss";

function PhotoCardList() {
  return (
    <div className="photoList flex">
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
    </div>
  );
}

export default PhotoCardList;
