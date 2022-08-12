import React from "react";
import Spinner from "@images/icon/spinner_1.5.gif";
// import { Background } from "./LoadingStyles";
import "./LoadingStyles.scss";

export function Loading() {
  return (
    <div className="spinner_box">
      {/* <LoadingText className="notoMid fs-16">로딩 중입니다.</LoadingText> */}
      <img src={Spinner} alt="로딩중" className="spinner" />
    </div>
  );
}

export default Loading;
