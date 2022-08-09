import React, { useEffect } from "react";
// import React from 'react';
import "@styles/reset.css";
import "@styles/_typography.scss";
import "@styles/_common.scss";
import "@styles/font.css";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@store/user";
import { getUserInfo } from "@apis/user";
import Router from "./routers/Router";

function App() {
  const dispatch = useDispatch();

  // 유저 아이디가 세션에 있고 유저 정보가 없을 경우에 유저 정보 받아와야함
  const reqUser = async () => {
    const userRes = await getUserInfo(sessionStorage.getItem("userEmail"));
    dispatch(setUserInfo(userRes.userInfo));
  };
  useEffect(() => {
    if (sessionStorage.getItem("userEmail") !== null) {
      try {
        reqUser();
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return <Router />;
}

export default App;
