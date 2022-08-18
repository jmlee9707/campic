import React from "react";
import { Link } from "react-router-dom";
import "./MainBanner.scss";

function MainBanner() {
  return (
    <div className="main_banner flex align-center justify-center">
      <div className="main_banner_btn flex">
        <Link
          to="/board/photo/regist"
          className="main_banner_btn_write notoBold flex align-center justify-center fs-24"
        >
          사진 올리기
        </Link>
        <Link
          to="/board/talk/regist"
          className="main_banner_btn_move flex align-center justify-center notoBold fs-24"
        >
          꿀팁 쓰기
        </Link>
      </div>
    </div>
  );
}

export default MainBanner;
