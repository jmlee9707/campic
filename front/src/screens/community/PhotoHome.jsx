import React from "react";
import "./PhotoHome.scss";

import BestPhotoList from "@components/community/BestPhotoList";
import CommunityPhotoList from "@components/community/CommunityPhotoList";
import { Link } from "react-router-dom";

function PhotoHome() {
  return (
    <div className="container flex">
      <div className="picture flex align-center">
        <div className="picture_best">
          <p className="picture_best_week notoBold fs-32">WEEK BEST</p>
          <p className="picture_best_title notoMid fs-22">
            이번 주에 HOT한 감성 사진
          </p>
          <BestPhotoList />
        </div>
        <div className="picture_camp">
          <div className="picture_camp_title flex align-center">
            <p className="picture_camp_title_text notoBold fs-32">
              CAMPING PHOTO
            </p>
            <Link
              to="/board/photo/regist"
              className="picture_camp_title_btn notoBold fs-18"
            >
              글쓰기
            </Link>
          </div>
          <CommunityPhotoList />
        </div>
      </div>
    </div>
  );
}

export default PhotoHome;
