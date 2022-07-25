import React from "react";
import PhotoCard from "./CommunityPhotoCard";
import "./CommunityPhotoCard.scss";

function CommunityPhotoList() {
  return (
    <div className="flex photolist">
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

export default CommunityPhotoList;
