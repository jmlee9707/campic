import React from "react";
import "./PhotoHome.scss";

// import coco from "@images/coco.jpeg";
import BestPhotoList from "@components/community/BestPhotoList";
import CommunityPhotoList from "@components/community/CommunityPhotoList";

function PhotoHome() {
  return (
    <div className="container flex">
      <div className="picture flex align-center">
        {/* week best */}
        <div className="picture_best">
          <p className="picture_best_week notoBold fs-32">WEEK BEST</p>
          <p className="picture_best_title notoMid fs-22">
            이번 주에 HOT한 감성 사진
          </p>
          <div className="picture_best_pic">
            <BestPhotoList />
          </div>
        </div>
        {/* 캠핑포토 */}
        <div className="picture_camp">
          {/* 상단 타이틀바 */}
          <div className="picture_camp_title flex">
            <p className="picture_camp_title_text notoBold fs-32">
              CAMPING PHOTO
            </p>
            <button
              type="button"
              className="picture_camp_title_btn notoBold fs-18"
            >
              글쓰기
            </button>
          </div>
        </div>
        <div className="comp flex">
          <div className="comp_thr flex">
            <CommunityPhotoList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoHome;
