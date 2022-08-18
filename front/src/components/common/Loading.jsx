import React from "react";
import Spinner from "@images/icon/spinner_1.5.gif";
import "./LoadingStyles.scss";

export function Loading() {
  return (
    <div className="spinner_box">
      <img src={Spinner} alt="로딩중" className="spinner" />
    </div>
  );
}

export default Loading;
