import React, { useState, useEffect } from "react";
import "./MyFeed.scss";
import MyPhotoList from "@components/mypage/MyPhotoCardList";
import MyTalkList from "@components/mypage/MyTalkCardList";
// import navLogo from "@images/logo/logo_icon_green.svg";

import { useSelector } from "react-redux";
import { selectProfile } from '@store/user';
import { getMyPhoto } from "../../apis/photo";

function MyFeed() {
  const [photoClick, setPhotoClick] = useState(true);
  const [talkClick, setTalkClick] = useState(false);
  const Profile = useSelector(selectProfile);
  const onPhoto = () => {
    setPhotoClick(true);
    setTalkClick(false);
  };
  const onTalk = () => {
    setPhotoClick(false);
    setTalkClick(true);
  };


  // 포토 등록 개수 불러오기
  const email = useSelector(state => state.user.email);
  const [myPhotoList, setMyPhotoList] = useState([]);
  useEffect(() => {
    // await 를 사용하기 위해서 Async 선언
    async function getAndSetMyPhotoList() {
      const res = await getMyPhoto(email);
      // console.log(res);
      // console.log("11111");
      setMyPhotoList(res);
    }
    getAndSetMyPhotoList();
  }, []);

  return (
    <div className="container flex">
      <div className="myfeed flex">
        <div className="myfeed_profile flex">
          <div className="myfeed_profile_pic">
            <img src={ Profile.profileImg } alt="프로필이미지" />
          </div>
          <div className="myfeed_profile_content">
            <div className="myfeed_profile_content_name notoBold fs-32">
              { Profile.nickname }
            </div>
            <div className="myfeed_profile_content_email notoBold fs-22">
            { Profile.email }
            </div>
            <div className="myfeed_profile_content_extra flex">
              <div className="myfeed_profile_content_extra_poname notoMid fs-16">
                PHOTO
              </div>
              <div className="myfeed_profile_content_extra_pocnt roMid fs-16">
                {myPhotoList.length}
              </div>
              <div className="myfeed_profile_content_extra_taname notoMid fs-16">
                TALK
              </div>
              <div className="myfeed_profile_content_extra_tacnt roMid fs-16">
                7777
              </div>
            </div>
          </div>
        </div>
        <div className="divideline" />
        <div className="myfeed_sel flex">
          <button
            type="button"
            className="myfeed_sel_phot notoBold fs-16"
            onClick={onPhoto}
          >
            PHOTO
          </button>
          <div className="dividevert" />
          <button
            type="button"
            className="myfeed_sel_tal notoBold fs-16"
            onClick={onTalk}
          >
            TALK
          </button>
        </div>
        <div className="myfeed_compo">
          {photoClick && <MyPhotoList />}
          {talkClick && <MyTalkList />}
        </div>
      </div>
    </div>
  );
}

export default MyFeed;
