import React from "react";
import { Link } from "react-router-dom";
import "./TalkHome.scss";
import BestTalkList from "@components/community/BestTalkList";
import TalkList from "@components/community/TalkList";

function TalkHome() {
  return (
    <div className="container flex">
      <div className="talk flex align-center">
        <div className="talk_best">
          <p className="talk_best_title notoBold fs-32">WEEKLY BEST TALK</p>
          <p className="talk_best_sub notoMid fs-22">
            이번 주에 HOT한 감성 사진
          </p>
          {/* <div className="talk_best_card flex"> */}
          <BestTalkList />
          {/* </div> */}
        </div>
        <div className="talk_camp">
          {/* 상단 타이틀바 */}
          <div className="talk_camp_title flex align-center">
            <p className="talk_camp_title_text notoBold fs-32">CAMPING TALK</p>
            <Link
              to="/board/talk/regist"
              className="talk_camp_title_btn notoBold fs-18"
            >
              글쓰기
            </Link>
          </div>
          <TalkList />
        </div>
      </div>
    </div>
  );
}

export default TalkHome;
