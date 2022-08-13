import React from "react";
import "./CommunityComment.scss";

import navLogo from "@images/logo/logo_icon_green.svg";

function CommunityComment() {
  return (
    <div className="comment flex">
      {/* 프로필 이미지 */}
      <div className="comment_img">
        <img src={navLogo} alt="프로필이미지" />
      </div>
      {/* 나머지 부분 */}
      <div className="comment_extra flex ">
        {/* 이름 */}
        <div className="comment_extra_name notoMid fs-20">제니</div>
        {/* 내용 */}
        <div className="comment_extra_text notoReg fs-18">
          오늘 기분 캠핑 각....
        </div>
        {/* 찐 나머지 */}
        <div className="comment_extra_true flex">
          {/* 작성시간 */}
          <div className="comment_extra_true_time notoReg fs-14">1시간 전</div>
          {/* 대댓글 */}
          <div className="comment_extra_true_re notoReg fs-14">답글달기</div>
        </div>
      </div>
    </div>
  );
}

export default CommunityComment;
