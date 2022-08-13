import React from "react";
import "./MainBanner.scss";

import navLogo from "@images/logo/logo_icon_green.svg";

function MainBanner() {
  return (
    <div className="main_banner flex">
      <div className="main_banner_txt flex">
        <div className="main_banner_txt_left">
          <div className="main_banner_txt_left_title notoBold fs-40">
            여름에 HOT한 계곡 근처 캠핑장
          </div>
          <div className="main_banner_txt_left_profile flex">
            <div className="main_banner_txt_left_profile_img">
              <img src={navLogo} alt="프로필 이미지" />
            </div>
            <div className="main_banner_txt_left_profile_name notoReg fs-18">
              빌헬름
            </div>
          </div>
        </div>
        <div className="main_banner_txt_right flex">
          <button
            type="button"
            className="main_banner_txt_right_btn_write notoBold fs-22"
          >
            글쓰기
          </button>
          <button
            type="button"
            className="main_banner_txt_right_btn_move notoBold fs-22"
          >
            보러가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
