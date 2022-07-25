import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavBar from "@components/common/MainNavBar";

import Home from "@screens/Home";

// user
import Login from "@screens/user/Login";
import Join from "@screens/user/Join";
import JoinFinish from "@screens/user/JoinFinish";
import FindId from "@screens/user/FindId";
import FindIdFinish from "@screens/user/FindIdFinish";
import FindPw from "@screens/user/FindPw";
import FindPwAuth from "@screens/user/FindPwAuth";
import FindPwCh from "@screens/user/FindPwCh";
import FindPwFinish from "@screens/user/FindPwFinish";
// mypage
import Drop from "@screens/mypage/Drop";
import DropFinish from "@screens/mypage/DropFinish";
import InfoEdit from "@screens/mypage/InfoEdit";
import PwCh from "@screens/mypage/PwCh";
import PwEdit from "@screens/mypage/PwEdit";

// community
import CommunityMain from "@screens/community/CommunityMain";
import PhotoRegist from "@screens/community/PhotoRegist";
import TalkRegist from "@screens/community/TalkRegist";
import PhotoDetail from "@screens/community/PhotoDetail";
import TalkDetail from "@screens/community/TalkDetail";

// camping
import CampingMain from "@screens/camping/CampingMain";
import CampingDetail from "@screens/camping/CampingDetail";

// plan
import PlanMain from "@screens/plan/PlanMain";
import PlanDetail from "@screens/plan/PlanDetail";

function Router() {
  return (
    <>
      <MainNavBar />

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

        {/* find ID/PW  */}
        <Route path="/findid/*">
          <Route index element={<FindId />} />
          <Route path="finish" element={<FindIdFinish />} />
        </Route>
        <Route path="/findpw/*">
          <Route index element={<FindPw />} />
          <Route path="auth" element={<FindPwAuth />} />
          <Route path="ch" element={<FindPwCh />} />
          <Route path="finish" element={<FindPwFinish />} />
        </Route>

        {/* info edit */}
        <Route path="/infoedit/*">
          <Route index element={<InfoEdit />} />
          <Route path="pwch" element={<PwCh />} />
          <Route path="pwedit" element={<PwEdit />} />
        </Route>

        {/* Drop */}
        <Route path="/drop/*">
          <Route index element={<Drop />} />
          <Route path="finish" element={<DropFinish />} />
        </Route>

        {/* community */}
        <Route path="/board/*">
          <Route index element={<CommunityMain />} />
          <Route path="photo/regist" element={<PhotoRegist />} />
          <Route path="talk/regist" element={<TalkRegist />} />
          <Route path="photo/detail/:id" element={<PhotoDetail />} />
          <Route path="talk/detail/:id" element={<TalkDetail />} />
        </Route>

        <Route path="/camping/*">
          <Route index element={<CampingMain />} />
          <Route path="detail" element={<CampingDetail />} />
        </Route>

        <Route path="/plan/*">
          <Route index element={<PlanMain />} />
          <Route path="detail" element={<PlanDetail />} />
        </Route>
      </Routes>
    </>
  );
}
export default Router;
