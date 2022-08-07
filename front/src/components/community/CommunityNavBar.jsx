import React from "react";
import "./CommunityNavBar.scss";
import { NavLink } from "react-router-dom";

function CommunityNavBar() {
  return (
    <div className="wrapper flex align-center">
      <nav className="commu_nav flex align-center">
        <NavLink className="commu_nav__link notoBold fs-16" to="/board">
          커뮤니티홈
        </NavLink>
        <NavLink
          className="commu_nav__link notoBold fs-16"
          to="/board/photo/home"
        >
          PHOTO
        </NavLink>
        <NavLink
          className="commu_nav__link notoBold fs-16"
          to="/board/talk/home"
        >
          TALK
        </NavLink>
      </nav>
    </div>
  );
}

export default CommunityNavBar;
