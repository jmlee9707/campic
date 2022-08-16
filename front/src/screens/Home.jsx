import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "@store/camp";

import "./Home.scss";
// import mainImg from "@images/main.jpeg";
function Home() {
  const dispatch = useDispatch();

  // 위도 경도 받아오기 함수
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch(
            setLocation({
              lati: position.coords.latitude,
              longi: position.coords.longitude
            })
          );
        },
        err => console.log(err),
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }
  // use effect
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="container">
      <div className="home_back  flex justify-center">
        {/* <img src={mainImg} alt="main"> */}
        <div className="home">
          <div className="home_title fs-60 notoBold">
            오늘은 <br />
            캠핑하기 좋은날!
          </div>
          <div className="home_sub fs-24 notoBold">
            캠핑 일정 정리와 캠핑장 검색을 한번에!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
