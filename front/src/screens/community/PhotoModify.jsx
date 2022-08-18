import React, { useRef, useState, useEffect } from "react";
import "./PhotoRegist.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PlzLogin from "@screens/PlzLogin" 
import { updatePhoto, getPhotoDetail } from "@apis/photo";

function PhotoModify() {
  const userId = useSelector(state => state.user.email);
  const navigate = useNavigate(); 
  const textareaRef = useRef(); 
  const tagRef = useRef(); 

 
  const { id } = useParams();
  const [photoDetail, setPhotoDetail] = useState([]);
  useEffect(() => {
    async function getAndSetPhotoDetail() {
      const res = await getPhotoDetail(id);
      setPhotoDetail(res);
    }
    getAndSetPhotoDetail();
  }, []);

  const modifyPhoto = async () => {
    const formData = new FormData();

    formData.append("boardId", id);
    formData.append("email", photoDetail.email);
    formData.append("content", textareaRef.current.value);
    formData.append("hashtag", tagRef.current.value);
    formData.append("fileName", "baek");



    const res = await updatePhoto(formData);
    if (res === "success") {
      navigate(`/board/photo/detail/${id}`);
    }
  };

  return (
    <div className="container flex">
      {userId !== null && <div className="photo_modify">
        <div className="photo_modify_title notoBold fs-32">사진 수정하기</div>
        <div className="photo_modify_content flex">
          <div className="photo_modify_content_img flex align-center justify-center">
            <div className="photo_modify_content_img_priv">
              <img alt="수정이미지" src={[photoDetail.blobFile]} />
            </div>
          </div>
          <div className="photo_modify_content_text">

            <textarea
              type="textarea"
              className="photo_modify_content_text_input_box notoMid fs-20"
              defaultValue={photoDetail.content}
              ref={textareaRef}
            />

            <input
              type="text"
              defaultValue={photoDetail.hashtag}
              ref={tagRef}
              className="photo_modify_content_text_tag flex notoMid fs-20"
            />

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
