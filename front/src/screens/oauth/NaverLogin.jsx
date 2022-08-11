import * as React from 'react';
import { BASE_URL } from '@apis/index';
// import kakao from "@images/icon/kakao.svg";

import axios from 'axios';
import queryString from 'query-string';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setEmail } from '../../store/user';
import { setEmail, setUserInfo } from '@store/user';
// import { getUserInfo, getKakaoToken, kakaoLogin } from "../../apis/user";
import { getUserInfo } from "@apis/user";

function NaverLogin () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = queryString.parse(window.location.search);
 
  const getNaverTokenHandler = async (code1) => {

    axios.get(`https://nid.naver.com/oauth2.0/token?
      grant_type=${process.env.REACT_APP_GRANT_TYPE}&
      client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&
      code=${code1[0]}&
      state=${code1[1]}`)
    .then((res) => {
      // console.log(res.data)
      axios.post(`${BASE_URL}/social/naver`, {Authorization: res.data.access_token})
      .then(res1 => {
        // console.log(res1);
        // 로그인 작업
        // 리덕스 스토어에 이메일 저장
        dispatch(setEmail({email: res1.data.email}))
        sessionStorage.setItem("userEmail", res1.data.email);
        // 세션스토리지에 토큰 저장
        sessionStorage.setItem("refreshToken", res1.data.refreshToken);
        sessionStorage.setItem("accessToken", res.data.Authorization);
        // 유저 정보 가져오기
        // console.log("유저 정보 가져오기")
        getUserInfo(res1.data.email)
        .then(userRes => {
          dispatch(setUserInfo(userRes.userInfo))
        })
        // navigate("/");
      })
      navigate("/");
      // .catch(err => {
      //   console.log(err);
      //   navigate("/",{ replace: true});
      //   navigate("/login");
      // });

      
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