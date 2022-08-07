// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// style import
import "./MainNavBar.scss";
import navLogo from "@images/logo/logo_text_green.svg";
// import temp from "@images/cute.jpeg";
import { reset, selectProfile } from "../../store/user";
import "./NavTooltip.scss";

function MainNavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userId = useSelector(state => state.user.email);
  // const userId = useSelector(state => state.user.email);
  const Profile = useSelector(selectProfile);

  const activeClassName = active => {
    const prefix = "left_nav__link fs-16 btn--";
    return active ? `${prefix}active` : `${prefix}unactive`;
  };

  const logoutClick = () => {
    // 토큰 삭제를 위해서 클리어
    sessionStorage.clear();
    // 리덕스 유저 스토어 초기화
    dispatch(reset());
    navigate("/"); // 홈으로 이동
  };

  const [openTool, setOpenTool] = useState(false);
  const openTooltip = () => {
    setOpenTool(!openTool);
  };
  const moveEdit = () => {
    navigate("/infoedit");
    setOpenTool(!openTool);
  };
  const moveInfo = () => {
    navigate("/infoedit");
    setOpenTool(!openTool);
  };
  const moveMyFeed = () => {
    navigate("/mypage/myfeed");
    setOpenTool(!openTool);
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
          {Profile.email === null ? (
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
              <button
                type="button"
                className="right_nav__link_user fs-16"
                onClick={logoutClick}
              >
                로그아웃
              </button>
              <button
                type="button"
                className="right_nav__link_user_img fs-16"
                onClick={openTooltip}
              >
                {/* <img src={userInfo.profileImg} alt="userProfile" /> */}
                <img src={Profile.profileImg} alt="userProfile" />
              </button>
            </>
          )}
        </nav>
      </nav>
      {openTool && (
        <div className="my_tool">
          <div className="my_tool_box flex justify-center column">
            <button
              type="button"
              to="/mypage/myfeed"
              className="my_tool_info flex align-center fs-13"
              onClick={moveMyFeed}
            >
              내 계정
            </button>
            <button
              type="button"
              to="/infoedit"
              className="my_tool_edit flex align-center fs-13"
              onClick={moveEdit}
            >
              개인정보 수정
            </button>
            <button
              type="button"
              to="/myfeed"
              className="my_tool_about flex align-center fs-13"
              onClick={moveInfo}
            >
              사이트 정보
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainNavBar;
