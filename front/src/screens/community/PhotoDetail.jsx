import React from "react";

import "./PhotoDetail.scss";

import navLogo from "@images/logo/logo_icon_green.svg";
import coverImg from "@images/cute.jpeg";

function PhotoDetail() {
  return (
    <div className="container flex">
      <div className="campPhoto">
        {/* 상단 프로필 */}
        <div className="campPhoto_profile flex">
          <img className="campPhoto_profile_img" src={navLogo} alt="프로필이미지" />
          <div className="campPhoto_profile_extra flex align-center">
            <div className="campPhoto_profile_extra_text align-center">
              <p className="campPhoto_profile_extra_text_name notoBold fs-26">
                클로이
              </p>
              <p className="campPhoto_profile_extra_text_time notoMid fs-18">
                11시간 전
              </p>
            </div>
            <div className="campPhoto_profile_extra_good flex justify-center align-center">
              <button type="button" className="notoBold fs-18">
                좋아요
              </button>
            </div>
          </div>
        </div>
        {/* 커버사진 */}
        <div className="campPhoto_cover flex">
          <img src={coverImg} alt="커버이미지" />
        </div>
        {/* 조회수, 좋아요 박스 */}
        <div className="campPhoto_count flex">
          {/* 조회수 */}
          <div className="campPhoto_count_view flex">
            <div className="campPhoto_count_view_name notoMid fs-18">조회수</div>
            <div className="campPhoto_count_view_num roMid fs-18">7777</div>
          </div>
          {/* 좋아요 */}
          <div className="campPhoto_count_like flex">
            <div className="campPhoto_count_like_name notoMid fs-18">좋아요</div>
            <div className="campPhoto_count_like_num roMid fs-18">7777</div>
          </div>
        </div>
        {/* 본문박스 */}
        <div className="campPhoto_text notoMid fs-24">
          어제 밤에 했어야 됐는데 왜 잤을까 흑흑 미안의 쏘리쏘리 땐쓰~ 끝을
          보려면 글을 조금 더 써야 하는구나
        </div>
        {/* 태그박스 */}
        <div className="campPhoto_tag notoMid fs-24">
          #태그 #일단 #써두면 #되는 #걸까 #?
        </div>
      </div>
    </div>
  );
}

export default PhotoDetail;
