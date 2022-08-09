import React, { useState, useEffect } from "react";
import "./PlanDetail.scss";
import TodoItemList from "@components/plan/TodoItemList";
import mainImg from "@images/temp_1.jpeg";
import { useParams } from "react-router-dom";
import Location from "@components/common/Location";
import { getPlanDetail } from "../../apis/plan";
// import TodoItemList from "@components/plan/TodoItemList";

function PlanDetail() {
  const [planInfo, setPlanInfo] = useState("");
  const { id: planId } = useParams();
  // const [start, setStart] = useState("");
  // const [end, setEnd] = useState("");

  // const getPlanInfo = async () => {
  //   const res = await getPlanDetail(planId);
  //   setPlanInfo(res);
  // };

  useEffect(() => {
    async function getPlanInfo() {
      const res = await getPlanDetail(planId);
      setPlanInfo(res);
    }
    getPlanInfo(); // 초기 일정정보 받아오기
    // setStart(planInfo.startDate);
    // setEnd(planInfo.endDate);
  }, [planId]);

  console.log(planInfo);
  return (
    <div className="container flex justify-center">
      <div className="plan_detail">
        <div className="plan_detail_title notoBold fs-40">
          {planInfo.savedTitle}
        </div>
        <div className="plan_detail_subtitle flex align-center">
          <div className="plan_detail_subtitle_days roBold fs-20">
            {/* {start} ~ {end} */}
            {/* {planInfo.startDate} */}
            2022-07-14 ~ 2022-08-12
          </div>
          <div className="plan_detail_subtitle_writer notoMid fs-18">
            작성자 : {planInfo.email}
          </div>
        </div>
        <div className="plan_detail_box flex">
          <div className="plan_detail_box_right">
            <div className="plan_detail_box_right_img">
              <img src={mainImg} alt="coverImg" />
            </div>
            <p className="plan_detail_box_right_campName notoBold fs-30">
              {planInfo.campName}
            </p>
            <p className="plan_detail_box_right_address fs-20 notoMid">
              {planInfo.campAdd1}
              {planInfo.campAdd2}
            </p>
            <p className="plan_detail_box_right_phone fs-20 notoMid">
              {planInfo.campTel}
            </p>
          </div>
          <div className="plan_detail_box_left">
            <TodoItemList listId={planInfo.saveId} writer={planInfo.email} />
          </div>
        </div>
        <div className="plan_detail_map">
          <Location />
        </div>
      </div>
    </div>
  );
}

export default PlanDetail;
