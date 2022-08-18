import React from "react";
import "./CommunityComment.scss";
import navLogo from "@images/logo/logo_icon_green.svg";

function CommunityComment() {
  return (
    <div className="comment flex">
      <div className="comment_img">
        <img src={navLogo} alt="프로필이미지" />
      </div>
      <div className="comment_extra flex ">
        <div className="comment_extra_name notoMid fs-20">제니</div>
        <div className="comment_extra_text notoReg fs-18">
          오늘 기분 캠핑 각....
        </div>
        <div className="comment_extra_true flex">
          <div className="comment_extra_true_time notoReg fs-14">1시간 전</div>
          <div className="comment_extra_true_re notoReg fs-14">답글달기</div>
        </div>
      </div>
    </div>
  );
}

export default CommunityComment;
