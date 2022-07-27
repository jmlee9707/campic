import React from "react";
import { Routes, Route } from "react-router-dom";
import CommunityNavBar from "@components/community/CommunityNavBar";
// community
import CommunityMain from "@screens/community/CommunityMain";
// import PhotoHome from "@screens/community/PhotoHome"
// import TalkHome from "@screens/community/TalkHome"
import PhotoRegist from "@screens/community/PhotoRegist";
import TalkRegist from "@screens/community/TalkRegist";
import PhotoDetail from "@screens/community/PhotoDetail";
import TalkDetail from "@screens/community/TalkDetail";


function Community() {
  return (
    <>
      <CommunityNavBar />
      <Routes>
        <Route index element={<CommunityMain />} />
        {/* <Route path="photo/home" element={<PhotoHome />} />
        <Route path="talk/home" element={<TalkHome />} /> */}
        <Route path="photo/regist" element={<PhotoRegist />} />
        <Route path="talk/regist" element={<TalkRegist />} />
        <Route path="photo/detail/:id" element={<PhotoDetail />} />
        <Route path="talk/detail/:id" element={<TalkDetail />} />
      </Routes>
    </>
  );
}

export default Community;
