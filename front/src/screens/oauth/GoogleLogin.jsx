import * as React from 'react';
import { BASE_URL } from '@apis/index';

import axios from 'axios';
import queryString from 'query-string';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setUserInfo } from '@store/user';
import { getUserInfo, exchangeImg } from "@apis/user";
import "./Spinner.scss";

function GoogleLogin () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = queryString.parse(window.location.search);

  const getGoogleTokenHandler = async (stringCode) => {
    const data = {    
      grant_type: `${process.env.REACT_APP_GRANT_TYPE}`,
      client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      redirect_uri: `${process.env.REACT_APP_GOOGLE_REDIRECT_URL}`,
      code: stringCode,
      client_secret: `${process.env.REACT_APP_GOOGLE_CLIENT_SECRET}`
    };
    const qString = Object.keys(data).map((k)=> `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
    axios.post('https://accounts.google.com/o/oauth2/token', qString, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
    .then((res) => {
      axios.post(`${BASE_URL}/social/google`, {Authorization: res.data.access_token})
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
      getGoogleTokenHandler(query.code.toString());
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
export default GoogleLogin;