/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState, useEffect } from "react";
import "./PhotoRegist.scss";
// import imageCompression from "browser-image-compression";
import { useNavigate, useParams } from "react-router-dom";
// import { ReactComponent as Camera } from "@images/logo/logo_photo_black.svg";
import { useSelector } from "react-redux";
import PlzLogin from "@screens/PlzLogin" 
import { updatePhoto, getPhotoDetail } from "@apis/photo";

function PhotoModify() {
  const userId = useSelector(state => state.user.email);
  const navigate = useNavigate(); // 네비게이트, 작성 시 포토 상세페이지로 이동

  const textareaRef = useRef(); // 본문 ref
  const tagRef = useRef(); // 태그 ref

  // 기존 정보 가져오기
  const { id } = useParams();
  const [photoDetail, setPhotoDetail] = useState([]);
  useEffect(() => {
    // await 를 사용하기 위해서 Async 선언
    async function getAndSetPhotoDetail() {
      const res = await getPhotoDetail(id);
      setPhotoDetail(res);
    }
    getAndSetPhotoDetail();
  }, []);

  const modifyPhoto = async () => {
    const formData = new FormData();

    // 필요시 더 추가합니다.
    formData.append("boardId", id);
    // formData.append("nickname", photoDetail.nickname);
    formData.append("email", photoDetail.email);
    formData.append("content", textareaRef.current.value);
    formData.append("hashtag", tagRef.current.value);
    formData.append("fileName", "baek");
    // formData.append("file", photoDetail.blobFile);

    console.log(textareaRef.current.value);
    console.log(tagRef.current.value);

    // eslint-disable-next-line no-restricted-syntax
    for (const value of formData.values()) {
      console.log(value);
    }
    const res = await updatePhoto(formData);
    console.log(res);
    if (res === "success") {
      console.log("왜 안가")
      navigate(`/board/photo/detail/${id}`);
    }
  };

  return (
    <div className="container flex">
      {/* 커뮤니티 네브바 들어가야 함 */}
      {userId !== null && <div className="photo_modify">
        <div className="photo_modify_title notoBold fs-32">사진 수정하기</div>
        <div className="photo_modify_content flex">
          {/* 사진 업로드 박스 */}
          <div className="photo_modify_content_img flex align-center justify-center">
            <div className="photo_modify_content_img_priv">
              <img alt="수정이미지" src={[photoDetail.blobFile]} />
              {/* {fileImage && <img alt="수정이미지" src={fileImage} />} */}
            </div>
          </div>

          <div className="photo_modify_content_text">
            {/* 사진 설명 박스 */}

            <textarea
              type="textarea"
              className="photo_modify_content_text_input_box notoMid fs-20"
              defaultValue={photoDetail.content}
              ref={textareaRef}
            />

            {/* 태그 입력 박스 */}

            <input
              type="text"
              defaultValue={photoDetail.hashtag}
              ref={tagRef}
              className="photo_modify_content_text_tag flex notoMid fs-20"
              // maxLength={30} // 일단 maxlength지정 해둠
            />

            {/* 등록하기 버튼 */}
            <div className="photo_modify_content_text_box flex">
              <button
                type="button"
                className="photo_modify_content_text_btn notoBold fs-24"
                onClick={modifyPhoto}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>}
      {userId === null && <PlzLogin/>}
    </div>
  );
}

export default PhotoModify;
