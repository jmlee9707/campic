import React from "react";
import "./TalkDetail.scss";
import bannerImg from "@images/car.jpeg";
import navLogo from "@images/logo/logo_icon_green.svg";
import good from "@images/icon/favorite_black.svg";
import Comment from "@components/community/CommunityComment";

function TalkDetail() {
  const content = "dsdd";
  return (
    <div className="container flex justify-center">
      <div className="detail flex align-center">
        {/* 썸네일 이미지 */}
        <div className="detail_thumbnail flex">
          <img src={bannerImg} alt="상단배너" />
        </div>
        <div className="detail_talk">
          {/* 글 제목 */}
          <div className="detail_talk_title notoBold fs-40">
            10년차 캠핑러가 말하는 감성 캠핑 즐기는 법 best5
          </div>
          {/* 작성자 프로필 */}
          <div className="detail_talk_profile flex">
            <div className="detail_talk_profile_img">
              <img src={navLogo} alt="프로필이미지" />
            </div>
            {/* 이름, 게시일 */}
            <div className="detail_talk_profile_extra flex">
              {/* 이름 */}
              <div className="detail_talk_profile_extra_name notoMid fs-26">
                클로이
              </div>
              {/* 게시일 */}
              <div className="detail_talk_profile_extra_date notoMid fs-18">
                2022.07.14
              </div>
            </div>
          </div>
          {/* 본문 */}
          <div className="detail_talk_text fs-18 notoMid">{content}</div>
          {/* 태그, 좋아요버튼 */}
          <div className="detail_talk_tag flex align-center">
            {/* 태그 */}
            <div className="detail_talk_tag_name notoMid fs-24">
              #태그 #이번에도 #대충 #적어둘게
            </div>
            {/* 좋아요버튼 */}
            <div className="detail_talk_tag_good flex align-center justify-center">
              <button
                type="button"
                className="notoBold fs-18 flex align-center justify-center"
              >
                <img src={good} alt="good" />
              </button>
            </div>
          </div>
          {/* 좋아요랑 조회수 */}
          <div className="detail_talk_count flex">
            <div className="detail_talk_count_view flex">
              <div className="detail_talk_count_view_name notoMid fs-18">
                조회수
              </div>
              <div className="detail_talk_count_view_num roMid fs-18">7777</div>
            </div>
            {/* 좋아요 */}
            <div className="detail_talk_count_like flex">
              <div className="detail_talk_count_like_name notoMid fs-18">
                좋아요
              </div>
              <div className="detail_talk_count_like_num roMid fs-18">7777</div>
            </div>
          </div>
          <div className="divide" />
          {/* 댓글 갯수 */}
          <div className="detail_talk_comment_cnt flex">
            <div className="detail_talk_comment_cnt_text notoBold fs-24">
              댓글
            </div>
            <div className="detail_talk_comment_cnt_num roMid fs-24">
              0{/* 0이 넘어가면 옆에 댓글 위치가 깨지는 문제가 있음 */}
            </div>
          </div>
          {/* 댓글작성공간 */}
          <div className="detail_talk_comment_input flex">
            {/* 프로필 이미지 */}
            <div className="detail_talk_comment_input_img">
              <img src={navLogo} alt="프로필이미지" />
            </div>
            {/* 댓글입력부분 */}
            <textarea
              type="textarea"
              className="detail_talk_comment_input_text fs-18 notoReg"
            />
            {/* 댓글입력버튼 */}
            <div className="detail_talk_comment_input_btn notoBold flex align-center justify-center">
              <button type="button" className="fs-16">
                입력
              </button>
            </div>
          </div>
          {/* 댓글 */}
          <div className="detail_talk_comment">
            <Comment />
          </div>
          {/* 대댓글 */}
          <div className="detail_talk_commentRe">
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalkDetail;
