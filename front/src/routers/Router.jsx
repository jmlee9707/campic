import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainNavBar from '@components/common/MainNavBar';

import Home from "@screens/Home";
import Login from '@screens/Login';
import Join from '@screens/Join';
import JoinFinish from '@screens/JoinFinish';

// community
import CommunityMain from '@screens/community/CommunityMain';
import PhotoRegist from '@screens/community/PhotoRegist';
import TalkRegist  from '@screens/community/TalkRegist';

function Router(){
    return (
        <>
            <MainNavBar />
            
        <Routes>
            {/* main */}
            <Route path ="/" element={<Home />} />

            {/* login */}
            <Route path = "/login" element = {<Login />} />

            {/* join */}
            <Route path = "/join/*">
                <Route index element = {<Join />} />
                <Route path = "finish" element = {<JoinFinish />} />
            </Route>
                
            {/* community */}
            <Route path = "/board/*">
                <Route index element = {<CommunityMain />} />
                    <Route path="photo/regist" element={<PhotoRegist />} />
                    <Route path="talk/regist" element = {<TalkRegist />} />
            </Route>
        </Routes>

        </>
    );
}
export default Router;