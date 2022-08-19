import React from "react";
import { Routes, Route } from "react-router-dom";
import CommunityNavBar from "@components/community/CommunityNavBar";
// community
import CommunityMain from "@screens/community/CommunityMain";
import PhotoHome from "@screens/community/PhotoHome";
import TalkHome from "@screens/community/TalkHome";
import PhotoRegist from "@screens/community/PhotoRegist";
import TalkRegist from "@screens/community/TalkRegist";
import PhotoDetail from "@screens/community/PhotoDetail";
import PhotoModify from "@screens/community/PhotoModify";
import TalkDetail from "@screens/community/TalkDetail";
import TalkUpdate from "@screens/community/TalkUpdate";
import NotFound from "@screens/NotFound";

function Community() {
  return (
    <>
      <CommunityNavBar />
      <Routes>
        <Route index element={<CommunityMain />} />
        <Route path="photo/home" element={<PhotoHome />} />
        <Route path="photo/regist" element={<PhotoRegist />} />
        <Route path="photo/detail/:id" element={<PhotoDetail />} />
        <Route path="photo/modi/:id" element={<PhotoModify />} />
        <Route path="photo/detail" element={<PhotoDetail />} />

        <Route path="talk/home" element={<TalkHome />} />
        <Route path="talk/regist" element={<TalkRegist />} />
        <Route path="talk/detail/:id" element={<TalkDetail />} />
        <Route path="talk/detail" element={<TalkDetail />} />
        <Route path="talk/modi/:id" element={<TalkUpdate />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Community;
