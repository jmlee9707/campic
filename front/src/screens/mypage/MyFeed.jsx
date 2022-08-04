import React, { useState } from "react";
import "./MyFeed.scss";
import MyPhotoList from "@components/mypage/MyPhotoCardList";
import MyTalkList from "@components/mypage/MyTalkCardList";

// import navLogo from "@images/logo/logo_icon_green.svg";

import { useSelector } from "react-redux";
import { selectProfile } from '../../store/user';

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
                7777
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
