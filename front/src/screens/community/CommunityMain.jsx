import React from "react";
import "./CommunityMain.scss";
import { Link } from "react-router-dom";
import BestTalkList from "@components/community/BestTalkList";
import PhotoMainList from "@components/community/PhotoMainList";
import MainBanner from "@components/community/MainBanner";

function CommunityMain() {
  return (
    <div className="container flex">
      <div className="commu flex">
        <div className="commu_ban">
          <MainBanner />
        </div>
        <div className="commu_bestpic">
          <p className="commu_bestpic_week notoBold fs-32">BEST PHOTO</p>
          <div className="commu_bestpic_extra flex">
            <p className="commu_bestpic_extra_title notoMid fs-22">
              감성 넘치는 사진 자랑 해 볼까요?
            </p>
            <Link
              to="/board/photo/home"
              className="commu_bestpic_extra_more notoMid fs-22"
            >
              더보기
            </Link>
          </div>
          <div className="commu_bestpic_comp flex align-center column justify-center">
            <PhotoMainList />
          </div>
        </div>
        <div className="commu_besttalk ">
          <p className="commu_besttalk_week notoBold fs-32">BEST TALK</p>
          <div className="commu_besttalk_extra flex">
            <p className="commu_besttalk_extra_title notoMid fs-22">
              나만 아는 캠핑 노하우를 공유 해 주세요:)
            </p>
            <Link
              to="/board/talk/home"
              className="commu_besttalk_extra_more notoMid fs-22"
            >
              더보기
            </Link>
          </div>
          <div className="commu_besttalk_comp flex align-center column justify-center">
            <BestTalkList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityMain;
