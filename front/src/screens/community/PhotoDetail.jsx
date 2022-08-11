import React, { useState, useEffect } from "react";
import "./PhotoDetail.scss";
import moment from "moment";
import "moment/locale/ko";
import temp111 from "@images/car.jpeg";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getPhotoDetail,
  photoLike,
  photoDisLike,
  photoDelete,
  getIsLiked
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
  const [photoDetail, setPhotoDetail] = useState("");
  const params = {
    boardId: id,
    email: userId // 값 똑같으면 이름 지정 안해도 됨
  };
  // 수정
  const updatePhoto = () => {
    navigate(`/board/photo/modi/${id}`);
  };

  // const [like, setLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [viewCnt, setViewCnt] = useState(0);

  //= ===================  초기정보 가져오기===================
  // 초기 정보 가져오기
  async function getAndSetIsLiked() {
    const res = await getIsLiked(params);
    setIsLiked(res.isLike);
  }
  async function getAndSetPhotoDetail() {
    const res = await getPhotoDetail(id);
    setPhotoDetail(res);
    setLikeCnt(res.like);
    setViewCnt(res.click);
    getAndSetIsLiked();
  }
  // 좋아요
  async function liked() {
    const res = await photoLike(params);
    if (res.message === "success") {
      // setLike(true);
      // setLikeCnt(res.like + 1);
      setIsLiked(1);
    }
  }
  console.log(photoDetail.nickname);
  // 싫어요
  async function disLiked() {
    const res = await photoDisLike(params);
    if (res.message === "success") {
      // setLike(false);
      // setLikeCnt(likeCnt - 1);
      // console.log(likeCnt);
      setIsLiked(0);
    }
  }

  async function deletePhoto() {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const res = await photoDelete(photoDetail.boardId);
      if (res.message === "success") {
        console.log(res.message);
      }
      navigate("/board/photo/home");
    }
  }
  // ==========useEffect------------------------
  useEffect(() => {
    // getAndSetIsLiked();
    getAndSetPhotoDetail();
    console.log(isLiked);
    // console.log(likeCnt);
  }, [likeCnt, isLiked]);

  // 업로드 시간 가공
  const uploadTime = moment(photoDetail.uploadDate).fromNow();
  // console.log(photoDetail.blobFile)

  return (
    <div className="container flex">
      {Object.keys(photoDetail).length !== 0 && (
        <div className="campPhoto">
          {/* 상단 프로필 */}
          <div className="campPhoto_profile flex">
            <div className="campPhoto_profile_img">
              <img
                className="campPhoto_profile_proimg"
                src={temp111}
                alt="프로필이미지"
              />
            </div>
            <div className="campPhoto_profile_extra flex align-center">
              <div className="campPhoto_profile_extra_text align-center">
                <p className="campPhoto_profile_extra_text_name notoBold fs-26">
                  {photoDetail.nickname !== "" && <> {photoDetail.nickname} </>}
                  {photoDetail.nickname === "" && <div>캠픽사용자</div>}
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
                      className="notoBold fs-18"
                      onClick={liked}
                    >
                      좋아요
                    </button>
                  )}
                  {isLiked === 1 && (
                    <button
                      type="button"
                      className="notoBold fs-18"
                      onClick={disLiked}
                    >
                      좋아요 취소
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* 커버사진 */}
          <div className="campPhoto_cover flex">
            <img src={[photoDetail.blobFile]} alt="상세보기" />
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
            {photoDetail.content}
          </div>
          {/* 태그박스 */}
          <div className="campPhoto_tag notoMid fs-24">
            {photoDetail.hashtag}
          </div>
          {nickname === photoDetail.nickname && (
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
      {/* 수정, 삭제 버튼 - 내가 쓴 글일때만 보이게 하기 */}
    </div>
  );
}

export default PhotoDetail;