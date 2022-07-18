import React from 'react';
import { Link, NavLink} from "react-router-dom";

// style import 
import "./MainNavBar.scss";
import navLogo from "@images/logo/logo_text_green.svg"

function MainNavBar (){
    return (
    <div className="wrapper flex align-center">
            <nav id="MainNavBar" className="flex align-center">
                <Link to="/" className='left_nav__link'>
                    <img className="logo" title="!213" alt="logoImage" src={navLogo} />
                </Link>
                <nav className="left_nav notoBold flex align-center">
                    <NavLink to="/login">캠핑장</NavLink>
                    <NavLink to="/board/talk/regist">계획하기</NavLink>
                    <NavLink to="/board/photo/regist">커뮤니티</NavLink>
                </nav>
                <nav className="right_nav notoReg">
                    <NavLink to="/login">로그인</NavLink>
                    <NavLink to="/join/finish">회원가입</NavLink>
                </nav>
            </nav>
        </div>
        //  <img className="logo" alt="logoImage" src={navLogo} />
    );
}

export default MainNavBar;
