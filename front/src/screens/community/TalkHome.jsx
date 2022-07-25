import React from "react";
import "./TalkHome.scss";

import TalkMain from "@components/community/TalkMain";
import TalkCard from "@components/community/TalkCard";
import MainBanner from "@components/community/MainBanner";

// import coco from "@images/coco.jpeg";

function TalkHome() {
  return (
    <div className="container flex">
      <div className="talk flex">
        <div className="talk_titleImg">
          <MainBanner />
        </div>
        {/* week best */}
        <div className="talk_best">
          <p className="talk_best_title notoBold fs-32">BEST TALK</p>
          <p className="talk_best_sub notoMid fs-22">
            이번 주에 HOT한 감성 사진
          </p>
          <div className="talk_best_card flex">
            <TalkCard />
            <TalkCard />
            <TalkCard />
          </div>
        </div>
        {/* 캠핑포토 */}
        <div className="talk_camp">
          {/* 상단 타이틀바 */}
          <div className="talk_camp_title flex">
            <p className="talk_camp_title_text notoBold fs-32">CAMPING TALK</p>
            <button
              type="button"
              className="talk_camp_title_btn notoBold fs-18"
            >
              글쓰기
            </button>
          </div>
        </div>
        <div className="talk_camp_list">
          <TalkMain />
        </div>
      </div>
    </div>
  );
}

export default TalkHome;
