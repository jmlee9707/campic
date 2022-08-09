import React from "react";
import "./Home.scss";
// import mainImg from "@images/main.jpeg";

function Home() {
  return (
    <div className="container">
      <div className="home_back flex justify-center">
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
        {/* </img> */}
      </div>
      <div className="home_page">
        <div className="home">캠픽 어떤 서비스 인가요?</div>
      </div>
    </div>
  );
}

export default Home;
