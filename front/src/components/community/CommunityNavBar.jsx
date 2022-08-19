import React from "react";
import "./CommunityNavBar.scss";
import { NavLink } from "react-router-dom";

function CommunityNavBar() {
  return (
    <div className="wrapper flex align-center">
      <div id="commu_nav">
        <nav className="commu_nav_inner flex align-center">
          <NavLink className="commu_nav_inner__link notoBold fs-16" to="/board">
            커뮤니티홈
          </NavLink>
          <NavLink
            className="commu_nav_inner__link notoBold fs-16"
            to="/board/photo/home"
          >
            PHOTO
          </NavLink>
          <NavLink
            className="commu_nav_inner__link notoBold fs-16"
            to="/board/talk/home"
          >
            TALK
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default CommunityNavBar;
