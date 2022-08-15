/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import "./TalkComment.scss";
import dummyProfile from "@images/person.png";
import { updateComment, deleteComment } from "../../apis/talk";

function TalkComment({
  // talkId,
  commentId,
  nickname,
  depth,
  bundle,
  content,
  uploadDate,
  profileImg
}) {
  // console.log(talkId, email, depth, bundle, content, uploadDate);
  // const { id } = useParams();
  const uploadTime = moment(uploadDate).add(9, 'h').fromNow();
  // const [makeReply, setMakeReply] = useState("답글달기");
  const modiRef = useRef();
  // const recommentRef = useRef();
  const userEmail = useSelector(state => state.user.email);
  const nowdepth = depth;
  const nowbundle = bundle;
  const [ifClick, setIfClick] = useState(false);
  const onClickModi = () => {
    setIfClick(!ifClick);
  };
  const modiComment = async () => {
    const data = {
      email: userEmail,
      depth: nowdepth,
      bundle: nowbundle,
      content: modiRef.current.value
    };
    try {
      const res = await updateComment(commentId, data);
      if (res === commentId) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (depth === 1) {
  //     setMakeReply(bundle);
  //   }
  //   // console.log(talkId);
  // }, []);
  // const submitRecomment = async () => {
  //   const data = {
  //     email: talkEmail,
  //     depth: 1,
  //     bundle: commentId,
  //     content: recommentRef.current.value
  //   };
  //   try {
  //     const res = await writeComment(id, data);
  //     if (res === commentId) {
  //       console.log(res);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const delComment = async () => {
    const data = {
      content: "",
    };
    try {
      const res = await deleteComment(commentId, data);
      if (res === commentId) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="comment flex">
      {/* 프로필 이미지 */}
      <div className="comment_img">
        {profileImg !== null && <img src={profileImg} alt="프로필이미지" />}
        {profileImg === null && <img src={dummyProfile} alt="프로필이미지" />}
      </div>
      {/* 나머지 부분 */}
      <div className="comment_extra flex ">
        {/* 이름 */}
        <div className="comment_extra_name notoMid fs-20">{nickname}</div>
        {/* 내용 */}
        { content !== "" && (
          <div className="comment_extra_text notoReg fs-18">
            {content}
          </div>
        )}
        { content === "" && (
          <div className="comment_extra_text notoReg fs-18">
            - 삭제된 메세지입니다 -
          </div>
        )}
        {/* 찐 나머지 */}
        <div className="comment_extra_true flex">
          {/* 작성시간 */}
          { content !== "" && (
            <div className="comment_extra_true_time notoReg fs-14">
              {uploadTime}
            </div>
          )}
            {/* 대댓글
          { content !== "" && (
            <button
              type="button"
              className="comment_extra_true_makere notoReg fs-14"
            >
              {makeReply}
            </button>
          )} */}
          { content !== "" && (
            <button
              type="button"
              className="comment_extra_true_update notoReg fs-14"
              onClick={onClickModi}
            >
              수정하기
            </button>
          )}
          { content !== "" && (
            <button
              type="button"
              className="comment_extra_true_del notoReg fs-14"
              onClick={delComment}
            >
              삭제하기
            </button>
          )}
        </div>
        <div className="comment_extra_update notoReg fs-14">
          { content !== "" && ifClick === "true" && (
            <textarea
              type="textarea"
              className="comment_extra_update_text"
              ref={modiRef}
              placeholder={content}
            />
          )}
          {content !== "" && ifClick === "true" && (
            <button
              type="button"
              className="comment_extra_update_btn"
              onClick={modiComment}
            >
              입력
            </button>
          )}
        </div>
        {/* <div className="comment_extra_input notoReg fs-14">
          <textarea
            type="textarea"
            className="comment_extra_input_text"
            ref={recommentRef}
          />
          <button
            type="button"
            className="comment_extra_input_btn"
            onClick={submitRecomment}
          >
            입력
          </button>
        </div> */}
      </div>
    </div>
  );
}
export default TalkComment;
