import React from "react";
import { useNavigate } from "react-router-dom";
import "./PhotoMain.scss";

// eslint-disable-next-line react/prop-types
function PhotoMain({ blobFile, boardId }) {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(`/board/photo/detail/${boardId}`);
  };
  return (
    <button type="button" onClick={onClickImg}>
      <div className="MainPhoto">
        <img src={[blobFile]} alt="베스트이미지" />
      </div>
    </button>
  );
}

export default PhotoMain;
