import React from "react";
import { Link, NavLink } from "react-router-dom";

// style import
import "./MainNavBar.scss";
import navLogo from "@images/logo/logo_text_green.svg";

function MainNavBar() {
  const activeClassName = active => {
    const prefix = "left_nav__link fs-16 btn--";
    return active ? `${prefix}active` : `${prefix}unactive`;
  };

  return (
    <div className="wrapper flex align-center">
      <nav id="MainNavBar" className="flex align-center">
        <nav className="left_nav notoBold flex align-center">
          <Link to="/" className="left_nav__link flex">
            <img className="logo" title="!213" alt="logoImage" src={navLogo} />
          </Link>
          <NavLink
            className={({ isActive }) => activeClassName(isActive)}
            to="/camping"
          >
            캠핑장
          </NavLink>
          <NavLink
            className={({ isActive }) => activeClassName(isActive)}
            to="/plan"
          >
            계획하기
          </NavLink>
          <NavLink
            className={({ isActive }) => activeClassName(isActive)}
            to="/board/photo/regist"
          >
            커뮤니티
          </NavLink>
        </nav>
        <nav className="right_nav notoReg">
          <NavLink className="right_nav__link fs-16" to="/login">
            로그인
          </NavLink>
          <NavLink className="right_nav__link fs-16" to="/join">
            회원가입
          </NavLink>
        </nav>
      </nav>
    </div>
  );
}

export default MainNavBar;
