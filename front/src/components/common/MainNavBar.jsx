import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// style import
import "./MainNavBar.scss";
import navLogo from "@images/logo/logo_text_green.svg";
import temp from "@images/coco.jpeg";
import { reset } from "../../store/user";

function MainNavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("email");
  const activeClassName = active => {
    const prefix = "left_nav__link fs-16 btn--";
    return active ? `${prefix}active` : `${prefix}unactive`;
  };

  const logoutClick = () => {
    sessionStorage.clear(); // 세션 스토리지에 저장된 값 지우기
    // console.log(sessionStorage.getItem("email"));
    // state에 저장된 값 지우기
    dispatch(reset());
    navigate("/"); // 홈으로 이동
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
            to="/board"
          >
            커뮤니티
          </NavLink>
        </nav>
        <nav className="right_nav notoReg flex align-center">
          {userId === null ? (
            <>
              <NavLink className="right_nav__link_none fs-16" to="/login">
                로그인
              </NavLink>
              <NavLink className="right_nav__link_none fs-16" to="/join">
                회원가입
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="right_nav__link_none fs-16" to="/mypage/Drop">
                마이페이지
              </NavLink>
              <button
                type="button"
                className="right_nav__link_user fs-16"
                onClick={logoutClick}
              >
                로그아웃
              </button>
              <button type="button" className="right_nav__link_user_img fs-16">
                {/* <img src={userInfo.profileImg} alt="userProfile" /> */}
                <img src={temp} alt="userProfile" />
              </button>
            </>
          )}
        </nav>
      </nav>
    </div>
  );
}

export default MainNavBar;
