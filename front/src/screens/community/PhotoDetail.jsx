import React from "react";

import { useSelector } from "react-redux";

import "./PhotoDetail.scss";

import navLogo from "@images/logo/logo_icon_green.svg";
// import coverImg from "@images/cute.jpeg";

function PhotoDetail() {
  const image = useSelector(state => state.photos.value.img);
  const text = useSelector(state => state.photos.value.content);
  const tag = useSelector(state => state.photos.value.tag);
  // const dispatch = useDispatch()

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
          <img src={image} alt="커버이미지" />
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
          {text}
        </div>
        {/* 태그박스 */}
        <div className="campPhoto_tag notoMid fs-24">
          {tag}
        </div>
      </div>
    </div>
  );
}

export default PhotoDetail;
