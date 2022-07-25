import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavBar from "@components/common/MainNavBar";
import CommunityNavBar from "@components/community/CommunityNavBar";

import Home from "@screens/Home";
import Login from "@screens/Login";
import Join from "@screens/Join";
import JoinFinish from "@screens/JoinFinish";

// community
import CommunityMain from "@screens/community/CommunityMain";
import PhotoRegist from "@screens/community/PhotoRegist";
import TalkRegist from "@screens/community/TalkRegist";
import PhotoDetail from "@screens/community/PhotoDetail";
import TalkDetail from "@screens/community/TalkDetail";
import PhotoHome from "@screens/community/PhotoHome";
import TalkHome from "@screens/community/TalkHome";

// mypage
import MyFeed from "@screens/mypage/MyFeed";

function Router() {
  return (
    <>
      <MainNavBar />
      <CommunityNavBar />

      <Routes>
        {/* main */}
        <Route path="/" element={<Home />} />

        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* join */}
        <Route path="/join/*">
          <Route index element={<Join />} />
          <Route path="finish" element={<JoinFinish />} />
        </Route>

        {/* community */}
        <Route path="/board/*">
          <Route index element={<CommunityMain />} />
          <Route path="photo/regist" element={<PhotoRegist />} />
          <Route path="photo/detail" element={<PhotoDetail />} />
          <Route path="photo/home" element={<PhotoHome />} />
          <Route path="talk/home" element={<TalkHome />} />
          <Route path="talk/regist" element={<TalkRegist />} />
          <Route path="talk/detail" element={<TalkDetail />} />
        </Route>

        {/* mypage */}
        <Route path="/mypage/*">
          <Route path="myfeed" element={<MyFeed />} />
        </Route>
      </Routes>
    </>
  );
}
export default Router;
