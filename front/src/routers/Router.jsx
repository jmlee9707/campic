import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainNavBar from '@components/common/MainNavBar';

import Home from "@screens/Home";
import Login from '@screens/Login';
import Join from '@screens/Join';
import JoinFinish from '@screens/JoinFinish';

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
        </Routes>

        </>
    );
}
export default Router;