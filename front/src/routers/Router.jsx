import React from "react";
import { Route, Routes } from "react-router-dom";
import MainNavBar from "@components/common/MainNavBar";
// import CommunityNavBar from "@components/community/CommunityNavBar"
import Home from "@screens/Home";
// import { useSelector } from "react-redux";
// user
import Login from "@screens/user/Login";
import Join from "@screens/user/Join";
import JoinFinish from "@screens/user/JoinFinish";
import FindId from "@screens/user/FindId";
import FindIdFinish from "@screens/user/FindIdFinish";
import FindPw from "@screens/user/FindPw";
import FindPwCh from "@screens/user/FindPwCh";
import FindPwFinish from "@screens/user/FindPwFinish";
import KakaoLogin from "@screens/oauth/KakaoLogin";
import NaverLogin from "@screens/oauth/NaverLogin";
import GoogleLogin from "@screens/oauth/GoogleLogin";
// mypage
import Drop from "@screens/mypage/Drop";
import DropFinish from "@screens/mypage/DropFinish";
import InfoEdit from "@screens/mypage/InfoEdit";
import PwCh from "@screens/mypage/PwCh";
import PwEdit from "@screens/mypage/PwEdit";
import MyFeed from "@screens/mypage/MyFeed";

// import

// camping
import CampingMain from "@screens/camping/CampingMain";
import CampingDetail from "@screens/camping/CampingDetail";

// plan
import PlanMain from "@screens/plan/PlanMain";
import PlanDetail from "@screens/plan/PlanDetail";

// shopping
import Shopping from "@screens/shopping/shopping";

// others
import NotFound from "@screens/NotFound";
// import PlzLogin from "@screens/PlzLogin";

// Community
// import CommunityMain from "@screens/community/CommunityMain";
import Community from "./Community";
// import PhotoHome from "@screens/community/PhotoHome";
// import TalkHome from "@screens/community/TalkHome"
// import PhotoRegist from "@screens/community/PhotoRegist";
// import PhotoDetail from "@screens/community/PhotoDetail";
// import PhotoModify from "@screens/community/PhotoModify";
// import TalkDetail from "@screens/community/TalkDetail";
// import PhotoModify from "../screens/community/PhotoModify";
// TALK
// import TalkHome from "@screens/community/TalkHome"
// import TalkRegist from "@screens/community/TalkRegist";
// import TalkDetail from "@screens/community/TalkDetail";
// import TalkUpdate from "@screens/community/TalkUpdate";

function Router() {
  // const isLogined = useSelector(state => state.user.email);

  return (
    <>
      <MainNavBar />
      <Routes>
        {/* main */}
        <Route path="/" element={<Home />} />
        {/* login */}
        <Route path="/login" element={<Login />} />
        <Route path="/kakao" element={<KakaoLogin />} />
        <Route path="/naver" element={<NaverLogin />} />
        <Route path="/google" element={<GoogleLogin />} />
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
          <Route path="change" element={<FindPwCh />} />
          <Route path="finish" element={<FindPwFinish />} />
        </Route>
        {/* info edit */}
        <Route path="/infoedit/*">
          <Route index element={<InfoEdit />} />
          <Route path="pwch" element={<PwCh />} />
          <Route path="pwedit" element={<PwEdit />} />
        </Route>
        {/* { isLogined &&
          <Route path="/infoedit/*">
            <Route index element={<InfoEdit />} />
            <Route path="pwch" element={<PwCh />} />
            <Route path="pwedit" element={<PwEdit />} />
          </Route>
        } */}
        {/* { !isLogined &&
          <Route path="/infoedit/*">
            <Route path="*" element={<PlzLogin />} />
          </Route>
        } */}

        {/* Drop */}
        <Route path="/drop/*">
          <Route index element={<Drop />} />
          <Route path="finish" element={<DropFinish />} />
        </Route>
        {/* { isLogined &&
          <Route path="/drop/*">
            <Route index element={<Drop />} />
            <Route path="finish" element={<DropFinish />} />
          </Route>
        }
        { !isLogined &&
        <Route path="/drop/*">
          <Route path="*" element={<PlzLogin />} />
        </Route>
        } */}

        {/* community */}
        <Route path="/board/*" element={<Community />} />
        {/* { isLogined && <Route path="/board/*" element={<Community/>}/> }
        { !isLogined && 
          <Route path="/board/*">
            <Route index element={<CommunityMain />} />
            <Route path="*" element={<PlzLogin />} />
          </Route>
        } */}

        {/* camping */}
        <Route path="/camping/*">
          <Route index element={<CampingMain />} />
          <Route path="detail/:id" element={<CampingDetail />} />
        </Route>
        {/* plan */}
        <Route path="/plan/*">
          <Route index element={<PlanMain />} />
          <Route path="detail/:id" element={<PlanDetail />} />
        </Route>
        {/* { isLogined &&
          <Route path="/plan/*">
          <Route index element={<PlanMain />} />
          <Route path="detail/:id" element={<PlanDetail />} />
        </Route>
        {/* // } */}
        {/* { !isLogined && 
          <Route path="/plan/*">
            <Route index element={<PlanMain />} />
            <Route path="*" element={<PlzLogin />} />
          </Route>
        } */}
        {/* <Route path="/plan/*">
          <Route index element={<PlanMain />} />
          <Route path="detail/:id" element={<PlanDetail />} />
        </Route> */}
        {/* mypage */}
        <Route path="/mypage/*">
          <Route path="myfeed" element={<MyFeed />} />
          <Route path="drop" element={<Drop />} />
          <Route path="drop/finish" element={<DropFinish />} />
          <Route path="pwch" element={<PwCh />} />
          <Route path="pwch/edit" element={<PwEdit />} />
          <Route path="info/edit" element={<InfoEdit />} />
        </Route>
        
        {/* shopping */}
        <Route path="/shopping" element={<Shopping />} />
        {/* { isLogined && 
          <Route path="/mypage/*">
            <Route path="myfeed" element={<MyFeed />} />
            <Route path="drop" element={<Drop />} />
            <Route path="drop/finish" element={<DropFinish />} />
            <Route path="pwch" element={<PwCh />} />
            <Route path="pwch/edit" element={<PwEdit />} />
            <Route path="info/edit" element={<InfoEdit />} />
          </Route>
        } */}
        {/* { !isLogined && 
          <Route path="/mypage/*">
            <Route path="*" element={<PlzLogin />} />
          </Route>
        } */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default Router;
