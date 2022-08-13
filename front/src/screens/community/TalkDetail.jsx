import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import "moment/locale/ko";
import "./TalkDetail.scss";
import navLogo from "@images/logo/logo_icon_green.svg";
import good from "@images/icon/favorite_black.svg";
import nogood from "@images/icon/favorite_border_black_24dp.svg";
import TalkComments from "@components/community/TalkComments";
// import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import {
  getTalkDetail,
  talkLike,
  talkDisLike,
  talkDelete,
  isTalkLike,
  writeComment,
} from "../../apis/talk";

function TalkDetail() {
  const [talkDetail, setTalkDetail] = useState({ contents: null });
  const { id } = useParams();
  const navigate = useNavigate();
  const uploadDay = moment(talkDetail.uploadDate).format("ll");
  const [talkLikeNum, setTalkLikeNum] = useState();
  // const [talkViewNum, setTalkViewNum] = useState();
  const [isLiked, setIsLiked] = useState(0);
  const talkEmail = useSelector(state => state.user.email);
  const nickname = useSelector(state => state.user.nickname);
  // const nickname = useSelector(state => state.user.nickname);
  const params = {
    talkId: id,
    // eslint-disable-next-line object-shorthand
    email: talkEmail
  };
  const commentRef = useRef();
  async function getTalkInfo() {
    const res = await getTalkDetail(id);
    setTalkDetail(res);
    // console.log(res);
  }
  useEffect(() => {
    getTalkInfo();
    setTalkLikeNum(talkDetail.like);
    // setTalkViewNum(talkDetail.click);
    // console.log(likeCnt);
  }, [talkLikeNum]);
  // const submitComment = async () => {
  async function submitComment() {
    const data = {
      email: talkEmail,
      depth: 0,
      bundle: -1,
      content: commentRef.current.value
    };
    try {
      const res = await writeComment(id, data);
      if (res.message === "success") {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // async function submitComment() {
  //   const data = {
  //     email: talkEmail,
  //     depth: 0,
  //     bundle: -1,
  //     content: commentRef.current.value
  //   };
  //   const res = await writeComment(id, data);
  //   console.log(res)
  // };
  useEffect(() => {
    async function getLikeInfo() {
      // eslint-disable-next-line no-use-before-define
      const res = await isTalkLike(params);
      // console.log(res);
      setIsLiked(res.isLike);
    }
    getLikeInfo();
    // setTalkLikeNum(talkDetail.like);
  }, []);
  async function checkTalkLike() {
    const res = await talkLike(params);
    if (res.message === "success") {
      setTalkLikeNum(res.like + 1);
      setIsLiked(1);
    }
  }
  async function noTalkLike() {
    const res = await talkDisLike(params);
    if (res.message === "success") {
      setTalkLikeNum(talkLikeNum - 1);
      setIsLiked(0);
    }
  }
  const updateTalk = () => {
    navigate(`/board/talk/modi/${id}`);
  };
  const deleteParams = {
    talkId: id
  };
  async function deleteTalk() {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const res = await talkDelete(deleteParams);
      if (res.message === "success") {
        console.log(res.message);
      }
      navigate("/board/talk/home");
    }
  };
  return (
    <div className="container flex justify-center">
      {Object.keys(talkDetail).length !== 0 && (
        <div className="detail flex align-center">
          {/* 썸네일 이미지 */}
          <div className="detail_thumbnail flex">
            <img src={[talkDetail.blobFile]} alt="상단배너" />
          </div>
          <div className="detail_talk">
            {/* 글 제목 */}
            <div className="detail_talk_title notoBold fs-40">
              {talkDetail.title}
            </div>
            {/* 작성자 프로필 */}
            <div className="detail_talk_profile flex">
              <div className="detail_talk_profile_img">
                <img src={[talkDetail.profileImgPath]} alt="프로필이미지" />
              </div>
              {/* 이름, 게시일 */}
              <div className="detail_talk_profile_extra flex">
                {/* 이름 */}
                <div className="detail_talk_profile_extra_name notoMid fs-26">
                  {talkDetail.nickname}
                </div>
                {/* 게시일 */}
                <div className="detail_talk_profile_extra_date notoMid fs-18">
                  {uploadDay}
                </div>
              </div>
            </div>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="detail_talk_content_box">
              {talkDetail.contents !== null && (
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onReady={editor => {
                    console.log(talkDetail.contents);
                    editor.setData(talkDetail.contents);
                    editor.enableReadOnlyMode(editor.id);
                  }}
                  config={{
                    toolbar: []
                  }}
                />
              )}
            </div>
            {/* 태그, 좋아요버튼 */}
            <div className="detail_talk_tag flex align-center">
              {/* 태그 */}
              <div className="detail_talk_tag_name notoMid fs-24">
                {talkDetail.hashtag}
              </div>
              {/* 좋아요버튼 */}
              {nickname !== null && (
                <div className="detail_talk_tag_good flex align-center justify-center">
                  {isLiked === 0 && (
                    <button
                      type="button"
                      className="detail_talk_tag_good_noLike notoBoldflex flex align-center justify-center"
                      onClick={checkTalkLike}
                    >
                      <img src={good} alt="good" />
                    </button>
                  )}
                  {isLiked === 1 && (
                    <button
                      type="button"
                      className="detail_talk_tag_good_like notoBold fs-18 flex align-center justify-center"
                      onClick={noTalkLike}
                    >
                      <img src={nogood} alt="nogood" />
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* 좋아요랑 조회수 */}
            <div className="detail_talk_count flex">
              <div className="detail_talk_count_view flex">
                <div className="detail_talk_count_view_name notoMid fs-18">
                  조회수
                </div>
                <div className="detail_talk_count_view_num roMid fs-18">
                  {/* {talkViewNum} */}
                  {talkDetail.click}
                </div>
              </div>
              {/* 좋아요 */}
              <div className="detail_talk_count_like flex">
                <div className="detail_talk_count_like_name notoMid fs-18">
                  좋아요
                </div>
                <div className="detail_talk_count_like_num roMid fs-18">
                  {talkDetail.like}
                </div>
              </div>
            </div>
            <div className="divide" />
            {nickname === talkDetail.nickname && (
              <div className="detail_talk_btns flex">
                <button
                  type="button"
                  className="detail_talk_btns_update notoBold fs-18"
                  onClick={updateTalk}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="detail_talk_btns_delete notoBold fs-18"
                  onClick={deleteTalk}
                >
                  삭제
                </button>
              </div>
            )}
            {/* 댓글 갯수 */}
            <div className="detail_talk_comment_cnt flex">
              <div className="detail_talk_comment_cnt_text notoBold fs-24">
                댓글
              </div>
              <div className="detail_talk_comment_cnt_num roMid fs-24">40</div>
            </div>
            {/* 댓글작성공간 */}
            <div className="detail_talk_comment_input flex align-center">
              {/* 프로필 이미지 */}
              <div className="detail_talk_comment_input_img">
                <img src={navLogo} alt="프로필이미지" />
              </div>
              {/* 댓글입력부분 */}
              <textarea
                type="textarea"
                className="detail_talk_comment_input_text fs-18 notoReg"
                ref={commentRef}
              />
              {/* 댓글입력버튼 */}
              <div className="detail_talk_comment_input_btn notoBold flex align-center justify-center">
                <button
                  type="button"
                  className="fs-16"
                  onClick={submitComment}
                  // disabled={!commentRef.current.value}
                >
                  입력
                </button>
              </div>
            </div>
            {/* 댓글 */}
            <div className="detail_talk_comment">
              <TalkComments />
            </div>
            {/* 대댓글 */}
            {/* <div className="detail_talk_commentRe" /> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default TalkDetail;
