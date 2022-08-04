import * as React from 'react';
// import kakao from "@images/icon/kakao.svg";

import axios from 'axios';
import queryString from 'query-string';

function KakaoLogin () {

  const query = queryString.parse(window.location.search);
 
  const getKakaoTokenHandler = async (code1) => {
    const data = {    
      grant_type: "authorization_code",
      client_id: 'ecf0cdf8c6d0f9625b2d33d19a397c94',
      redirect_uri: "http://localhost:3000/login/kakao",
      code: code1,
      client_secret: "g7n0SEsnPEWUjIUCMdUMzBPPZlbhW0Vo"
    };
    const qString = Object.keys(data).map((k)=> `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
    
    axios.post('https://kauth.kakao.com/oauth/token', qString, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
      console.log(res)
      
      // 로그인 작업
      
    });
  };

  React.useEffect(() => {  
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
    }
  }, []);

  return (
    <div>
      스피너 모양
    </div>
  );
};
export default KakaoLogin;