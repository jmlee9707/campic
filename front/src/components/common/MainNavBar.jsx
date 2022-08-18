// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import OffCanvas from "react-aria-offcanvas";
// style import
import "./MainNavBar.scss";
import logoGreen from "@images/logo/logo_text_green.svg";
import dummyicon from "@images/icon/dummyicon.jpg";
import logoWhite from "@images/logo/logo_text_white.svg";
import menuIcon from "@images/icon/menu.svg";
// import temp from "@images/cute.jpeg";
// 날씨 컴포넌트
import Weather from "@components/common/Weather";
import { reset, selectProfile } from "../../store/user";
import "./NavTooltip.scss";

function MainNavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Profile = useSelector(selectProfile);
  const { pathname } = useLocation();

  const activeClassName = active => {
    const prefix = "left_nav__link flex fs-16 btn--";
    return active ? `${prefix}active` : `${prefix}unactive`;
  };

  // const activeHome = active => {
  //   const prefix = "left_nav__link flex";
  //   return active ? `${prefix}active` : `${prefix}unactive`;
  // };

  const logoutClick = () => {
    // 토큰 삭제를 위해서 클리어
    sessionStorage.clear();
    // 리덕스 유저 스토어 초기화
    dispatch(reset());
    navigate("/"); // 홈으로 이동
  };

  const [openTool, setOpenTool] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const openTooltip = () => {
    setOpenTool(!openTool);
  };
  const openMobile = () => {
    console.log(openMenu);
    setOpenMenu(true);
  };
  const moveEdit = () => {
    navigate("/infoedit");
    if (openTool === true) {
      setOpenTool(!openTool);
    }
    if (openMenu === true) {
      setOpenMenu(!openMenu);
    }
  };
  const moveShopping = () => {
    navigate("/shopping");
    if (openTool === true) {
      setOpenTool(!openTool);
    }
    if (openMenu === true) {
      setOpenMenu(!openMenu);
    }
  };
  const moveCommu = () => {
    navigate("/board");
    if (openTool === true) {
      setOpenTool(!openTool);
    }
    if (openMenu === true) {
      setOpenMenu(!openMenu);
    }
  };
  const moveCamp = () => {
    navigate("/camping");
    if (openTool === true) {
      setOpenTool(!openTool);
    }
    if (openMenu === true) {
      setOpenMenu(!openMenu);
    }
  };
  const movePlan = () => {
    navigate("/plan");
    if (openTool === true) {
      setOpenTool(!openTool);
    }
    if (openMenu === true) {
      setOpenMenu(!openMenu);
    }
  };
  const moveInfo = () => {
    navigate("/infoedit");
    if (openTool === true) {
      setOpenTool(!openTool);
    }
    if (openMenu === true) {
      setOpenMenu(!openMenu);
    }
  };
  const moveMyFeed = () => {
    navigate("/mypage/myfeed");
    if (openTool === true) {
      setOpenTool(!openTool);
    }
    if (openMenu === true) {
      setOpenMenu(!openMenu);
    }
  };

  // useEffect(() => {
  //   showButton();
  // }, []);
  // window.addEventListener("resize", showButton);

  return (
    <div className="wrapper flex align-center">
      <div
        id="MainNavBar"
        className={pathname === "/" ? "home_click" : "none_click"}
      >
        <div className="container">
          <nav className="container_inner flex">
            <nav className="left_nav notoBold flex align-center justify-center">
              <Link to="/" className="left_nav__img ">
                {pathname !== "/" && (
                  <img className="logo" alt="logoImage" src={logoGreen} />
                )}
                {pathname === "/" && (
                  <img className="logo" alt="logoImage" src={logoWhite} />
                )}
                <img className="logo_mobile" alt="logoImage" src={logoGreen} />
              </Link>
              {pathname === "/" && (
                <>
                  <NavLink
                    className="left_nav__link flex notoMid fs-16"
                    to="/camping"
                  >
                    캠핑장
                  </NavLink>
                  <NavLink
                    className="left_nav__link flex notoMid fs-16"
                    to="/plan"
                  >
                    계획하기
                  </NavLink>
                  <NavLink
                    className="left_nav__link flex notoMid fs-16"
                    to="/board"
                  >
                    커뮤니티
                  </NavLink>
                  <NavLink
                    className="left_nav__link flex notoMid fs-16"
                    to="/shopping"
                  >
                    준비물
                  </NavLink>
                </>
              )}
              {pathname !== "/" && (
                <>
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
                  <NavLink
                    className={({ isActive }) => activeClassName(isActive)}
                    to="/shopping"
                  >
                    준비물
                  </NavLink>
                </>
              )}
            </nav>

            <nav className="right_nav notoReg flex align-center">
              <Weather />
              {Profile.email === null ? (
                <>
                  <NavLink
                    className="right_nav__link_none_login fs-16"
                    to="/login"
                  >
                    로그인
                  </NavLink>
                  <NavLink
                    className="right_nav__link_none_join fs-16"
                    to="/join"
                  >
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
                    {Profile ? (
                      <img src={Profile.profileImg} alt="" />
                    ) : (
                      <img src={dummyicon} alt="" />
                    )}
                  </button>
                </>
              )}
              <button
                type="button"
                className="right_nav_menu"
                onClick={openMobile}
              >
                <img src={menuIcon} alt="menu" />
              </button>
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
          {openMenu === true && (
            <div className="mobile_menu flex column ">
              <button
                type="button"
                className="mobile_menu__link fs-16"
                onClick={moveCamp}
              >
                캠핑장
              </button>
              <button
                type="button"
                className="mobile_menu__link fs-16"
                onClick={movePlan}
              >
                계획하기
              </button>
              <button
                type="button"
                className="mobile_menu__link fs-16"
                onClick={moveCommu}
              >
                커뮤니티
              </button>
              <button
                type="button"
                className="mobile_menu__link fs-16"
                onClick={moveShopping}
              >
                준비물
              </button>
              {Profile.email !== null && (
                <>
                  <div className="divide" />
                  <button
                    type="button"
                    to="/mypage/myfeed"
                    className="mobile_menu__link fs-16"
                    onClick={moveMyFeed}
                  >
                    내 계정
                  </button>
                  <button
                    type="button"
                    to="/infoedit"
                    className="mobile_menu__link fs-16"
                    onClick={moveEdit}
                  >
                    개인정보 수정
                  </button>
                  <button
                    type="button"
                    to="/myfeed"
                    className="mobile_menu__link fs-16"
                    onClick={moveInfo}
                  >
                    사이트 정보
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainNavBar;
