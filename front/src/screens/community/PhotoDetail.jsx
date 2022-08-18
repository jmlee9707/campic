import React, { useState, useEffect } from "react";
import "./PhotoDetail.scss";
import moment from "moment";
import "moment/locale/ko";
import good from "@images/icon/favorite_like.svg";
import dislike from "@images/icon/favorite_black.svg";

// import temp111 from "@images/car.jpeg";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dummyLogo from "@images/person.png";
import {
  getPhotoDetail,
  getIsLiked,
  getPhotoProfile,
  photoLike,
  photoDisLike,
  photoDelete
} from "../../apis/photo";

function PhotoDetail() {
  // 유저정보 가져오기 - 수정, 삭제를 위한
  const userId = useSelector(state => state.user.email);
  const nickname = useSelector(state => state.user.nickname);
  // 삭제 시 포토 메인페이지로 이동을 위한 네비게이트
  const navigate = useNavigate();

  const { id } = useParams();

  // 좋아요 유무 파악
  const [isLiked, setIsLiked] = useState(0);
  const [photoDetails, setPhotoDetail] = useState("");
  // 수정
  const updatePhoto = () => {
    navigate(`/board/photo/modi/${id}`);
  };

  const [likeCnt, setLikeCnt] = useState(0);
  const [viewCnt, setViewCnt] = useState(0);

  const uploadTime = moment(photoDetails.uploadDate).fromNow();

  const [photoNickname, setPhotoNickname] = useState("");
  const [photoProfile, setPhotoProfile] = useState();

  const integrated = async () => {
    // 포토 정보 받아오기
    const res = await getPhotoDetail(id);
    await setLikeCnt(res.like);
    await setViewCnt(res.click);
    setPhotoDetail(res);

    // 좋아요 여부 체크
    const res1 = await getIsLiked({ boardId: id, email: userId });
    await setIsLiked(res1.isLike);

    // 포토 프로필 받아오기
    const res2 = await getPhotoProfile(res.email);
    setPhotoNickname(res2.userInfo);
    setPhotoProfile(res2.profile);
  };

  useEffect(() => {
    integrated();
  }, []);

  // 좋아요
  // const [like, setLike] = useState(false);
  const params = {
    boardId: id,
    email: userId // 값 똑같으면 이름 지정 안해도 됨
  };
  async function liked() {
    const res = await photoLike(params);
    if (res.message === "success") {
      // setLike(true);
      setLikeCnt(res.like);
      setIsLiked(1);
    }
  }
  //   // console.log(photoDetail.nickname);
  // 싫어요
  async function disLiked() {
    const res = await photoDisLike(params);
    if (res.message === "success") {
      // setLike(false);
      setLikeCnt(likeCnt - 1);
      // console.log(likeCnt);
      setIsLiked(0);
    }
  }

  const deleteParams = {
    boardId: id
  };

  async function deletePhoto() {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const res = await photoDelete(deleteParams);
      if (res.message === "success") {
        console.log(res.message);
      }
      navigate("/board/photo/home");
    }
  }

  return (
    <div className="container flex">
      {Object.keys(photoDetails).length !== 0 && (
        <div className="campPhoto">
          {/* 상단 프로필 */}
          <div className="campPhoto_profile flex align-center">
            <div className="campPhoto_profile_img">
              {photoProfile !== null && (
                <img
                  className="campPhoto_profile_proimg"
                  src={photoProfile}
                  alt="프로필이미지"
                />
              )}
              {photoProfile === null && (
                <img
                  className="campPhoto_profile_proimg"
                  src={dummyLogo}
                  alt="프로필이미지"
                />
              )}
            </div>
            <div className="campPhoto_profile_extra flex align-center">
              <div className="campPhoto_profile_extra_text align-center">
                <p className="campPhoto_profile_extra_text_name notoBold fs-26">
                  {photoDetails.nickname !== "" && <div> {photoNickname} </div>}
                  {photoDetails.nickname === null && <div>캠픽사용자</div>}
                </p>
                <p className="campPhoto_profile_extra_text_time notoMid fs-18">
                  {uploadTime}
                </p>
              </div>
              {nickname !== null && (
                <div className="campPhoto_profile_extra_good flex justify-center align-center">
                  {isLiked === 0 && (
                    <button
                      type="button"
                      className="campPhoto_profile_extra_good_un flex align-center justify-center"
                      onClick={liked}
                    >
                      <img src={dislike} alt="good" />
                    </button>
                  )}
                  {isLiked === 1 && (
                    <button
                      type="button"
                      className="campPhoto_profile_extra_good_done flex align-center justify-center"
                      onClick={disLiked}
                    >
                      <img src={good} alt="good" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* 커버사진 */}
          <div className="campPhoto_cover flex">
            <img src={[photoDetails.blobFile]} alt="상세보기" />
          </div>
          {/* 조회수, 좋아요 박스 */}
          <div className="campPhoto_count flex">
            {/* 조회수 */}
            <div className="campPhoto_count_view flex">
              <div className="campPhoto_count_view_name notoMid fs-18">
                조회수
              </div>
              <div className="campPhoto_count_view_num roMid fs-18">
                {viewCnt}
              </div>
            </div>
            {/* 좋아요 */}
            <div className="campPhoto_count_like flex">
              <div
                type="button"
                className="campPhoto_count_like_name notoMid fs-18"
              >
                좋아요
              </div>
              <div className="campPhoto_count_like_num roMid fs-18">
                {likeCnt}
              </div>
            </div>
          </div>
          {/* 본문박스 */}
          <div className="campPhoto_text notoMid fs-24">
            {photoDetails.content}
          </div>
          {/* 태그박스 */}
          <div className="campPhoto_tag notoMid fs-24">
            {photoDetails.hashtag}
          </div>
          {nickname === photoNickname && (
            <div className="campPhoto_myPhotoOpt flex">
              <button
                type="button"
                className="campPhoto_myPhotoOpt_modify notoBold fs-18"
                onClick={updatePhoto}
              >
                수정
              </button>
              <button
                type="button"
                className="campPhoto_myPhotoOpt_delete notoBold fs-18"
                onClick={deletePhoto}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PhotoDetail;
