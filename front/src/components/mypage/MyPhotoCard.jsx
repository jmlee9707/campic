import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyPhotoCard.scss";

// import coco from "@images/coco.jpeg";

function MyPhotoCard({blobFile, boardId}) {
  const navigate = useNavigate();
  const onClickPhoto = () => {
    navigate(`/board/photo/detail/${boardId}`)
  }
  return (
    <button type="button" onClick={onClickPhoto}>
      <div className="photoCard">
        <img src={[blobFile]} alt="내 이미지" />
      </div>
    </button>
  );
}

export default MyPhotoCard;
