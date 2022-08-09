import React, { useState, useEffect } from "react";
import "./PhotoDetail.scss";
import moment from "moment";
import "moment/locale/ko";
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
  const userId = useSelector(state => state.user.email)
  const nickname = useSelector(state => state.user.nickname)

  const [photoDetail, setPhotoDetail] = useState([]);
  // const [like, setLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState();
  const [viewCnt, setViewCnt] = useState();
  const { id } = useParams();

  // 삭제 시 포토 메인페이지로 이동을 위한 네비게이트
  const navigate = useNavigate();

  useEffect(() => {
    // await 를 사용하기 위해서 Async 선언
    async function getAndSetPhotoDetail() {
      const res = await getPhotoDetail(id);
      setPhotoDetail(res);
    }
    getAndSetPhotoDetail();
    setLikeCnt(photoDetail.like);
    setViewCnt(photoDetail.click);
    // console.log(likeCnt);
  }, [likeCnt]); // likeCnt 의존배열

  // 업로드 시간 가공
  const uploadTime = moment(photoDetail.uploadDate).fromNow();

  // const email = "jmlee9707@naver.com";
  // console.log(likeCnt)
  const params = {
    boardId: id,
    email: userId // 값 똑같으면 이름 지정 안해도 됨
  };

  // 좋아요 유무 파악
  const[isLiked, setIsLiked] = useState(0)

  useEffect(() => {
    // await 를 사용하기 위해서 Async 선언
    async function getAndSetIsLiked() {
      const res = await getIsLiked(params);
      setIsLiked(res.isLike);
    }
    getAndSetIsLiked();
    // console.log(likeCnt);
  }, []);


  // 좋아요
  async function liked() {
    const res = await photoLike(params);

    if (res.message === "success") {
      // setLike(true);
      setLikeCnt(res.like + 1);
      // console.log(likeCnt)
      setIsLiked(1)  
    }

  }

  

  // 싫어요 
  async function disLiked() {
    const res = await photoDisLike(params);
    console.log(res);
    if (res.message === "success") {
      // setLike(false);
      setLikeCnt(likeCnt - 1);
      // console.log(likeCnt);
      // console.log(like)
      setIsLiked(0)
    }
  }

  


  // 수정
  const updatePhoto = () => {
    navigate(`/board/photo/modi/${id}`);
  };

  // 삭제
  // eslint-disable-next-line no-unused-vars
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
  // console.log(photoDetail.blobFile)

  return (
    <div className="container flex">
      {Object.keys(photoDetail).length !== 0 && (
        <div className="campPhoto">
          {/* 상단 프로필 */}
          <div className="campPhoto_profile flex">
            <img
              className="campPhoto_profile_proimg"
              src={photoDetail.profileImgPath}
              alt="프로필이미지"
            />
            <div className="campPhoto_profile_extra flex align-center">
              <div className="campPhoto_profile_extra_text align-center">
                <p className="campPhoto_profile_extra_text_name notoBold fs-26">
                  {photoDetail.nickname}
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
            <img src={[photoDetail.blobFile]} alt="왜 안될까" />
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
                {photoDetail.like}
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
