import * as React from 'react';
import { BASE_URL } from '@apis/index';


import axios from 'axios';
import queryString from 'query-string';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setUserInfo } from '@store/user';
import { getUserInfo, exchangeImg } from "@apis/user";

function NaverLogin () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = queryString.parse(window.location.search);

  const getNaverTokenHandler = async (code1) => {

    axios.get(`https://nid.naver.com/oauth2.0/token?grant_type=${process.env.REACT_APP_GRANT_TYPE}&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URL}&state=${code1[1]}&code=${code1[0]}`)
    .then((res) => {
      console.log("네이버 버그 테스트", res)
      axios.post(`${BASE_URL}/social/naver`, {Authorization: res.data.access_token})
      .then(res1 => {
        dispatch(setEmail({email: res1.data.email}))
        sessionStorage.setItem("userEmail", res1.data.email);
        sessionStorage.setItem("refreshToken", res1.data.refreshToken);
        sessionStorage.setItem("accessToken", res.data.Authorization);

        getUserInfo(res1.data.email)
        .then(userRes => {
          let tempUserRes = userRes;
          if (tempUserRes.userInfo.profileImg === null) {
            tempUserRes = exchangeImg(userRes);
          }
          dispatch(setUserInfo(tempUserRes.userInfo))
        })
      })
      navigate("/");
    });
  };

  React.useEffect(() => { 
    if (query.code) {
      getNaverTokenHandler([query.code.toString(), query.state.toString()]);
    }
  }, []);

  return (
    <div className="container flex align-center justify-center">
      <div className='spinner'>
        <span className='spinner-inner-1'> </span>
        <span className='spinner-inner-2'> </span>
        <span className='spinner-inner-3'> </span>
      </div>
    </div>
  );
};
export default NaverLogin;