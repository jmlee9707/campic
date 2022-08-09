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
    <div className="MainPhoto">
      <button type="button" onClick={onClickImg}>
        <img src={[blobFile]} alt="베스트이미지" />
      </button>
    </div>
  );
}

export default PhotoMain;
