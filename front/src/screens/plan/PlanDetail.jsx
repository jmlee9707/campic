import React, { useState, useEffect } from "react";
import "./PlanDetail.scss";
import TodoItemList from "@components/plan/TodoItemList";
import mainImg from "@images/temp_1.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import Location from "@components/common/Location";
import { getPlanDetail, deletePlan } from "@apis/plan";
import { useSelector } from "react-redux";
import ModifyPlanModal from "@components/camping/ModifyPlanModal";
// import TodoItemList from "@components/plan/TodoItemList";

function PlanDetail() {
  const [planInfo, setPlanInfo] = useState("");
  const { id: planId } = useParams();
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.email);
  const [modalVisible, setModalVisible] = useState(false);

  // const [start, setStart] = useState("");
  // const [end, setEnd] = useState("");

  // const getPlanInfo = async () => {
  //   const res = await getPlanDetail(planId);
  //   setPlanInfo(res);
  // };
  async function getPlanInfo() {
    try {
      const res = await getPlanDetail(planId);
      setPlanInfo(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPlanInfo(); // 초기 일정정보 받아오기
    // setStart(planInfo.startDate);
    // setEnd(planInfo.endDate);
  }, []);

  const openModify = () => {
    console.log(planInfo.savedTitle);
    // console.log(planInfo.startDate.substr(0, 10));
    setModalVisible(true);
  };

  const deletePlanInfo = async () => {
    // 일정 삭제
    const res = await deletePlan(planId);
    console.log(res);
    if (res === "fail") {
      navigate("/plan");
    }
  };
  return (
    <div className="container flex justify-center">
      <div className="plan_detail">
        <div className="plan_detail_title notoBold fs-40">
          {planInfo.savedTitle}
        </div>
        <div className="plan_detail_subtitle">
          <div className="plan_detail_subtitle_days roBold fs-20">
            {/* {start} ~ {end} */}
            {planInfo && planInfo.startDate.substr(0, 10)} ~
            {planInfo && planInfo.endDate.substr(0, 10)}
            {/* 2022-07-14 ~ 2022-08-12 */}
          </div>
          <div className="plan_detail_subtitle_writer notoMid fs-18">
            작성자 : {planInfo.email}
          </div>
        </div>
        <div className="plan_detail_box flex">
          <div className="plan_detail_box_right">
            <div className="plan_detail_box_right_img">
              {planInfo.firstImageUrl !== "\\N" && (
                <img src={planInfo.firstImageUrl} alt="coverImg" />
              )}
              {planInfo.firstImageUrl === "\\N" && (
                <img src={mainImg} alt="coverImg" />
              )}
            </div>
            <p className="plan_detail_box_right_campName notoBold fs-30">
              {planInfo.campName}
            </p>
            <p className="plan_detail_box_right_address fs-20 notoMid">
              {planInfo.campAdd1}
              {planInfo.campAdd2 !== "\\N" && <div>{planInfo.campAdd2}</div>}
            </p>
            <p className="plan_detail_box_right_phone fs-20 notoMid">
              {planInfo.campTel}
            </p>
          </div>
          <div className="plan_detail_box_left">
            {planInfo && (
              <TodoItemList listId={planInfo.saveId} writer={planInfo.email} />
            )}
          </div>
        </div>
        <div className="plan_detail_map">
          {planInfo && (
            <Location
              pos={{ mapY: planInfo.campMapX, mapX: planInfo.campMapY }}
            />
          )}
          <div className="divide" />
        </div>
        {userId === planInfo.email && (
          <div className="plan_detail_btn flex justify-center">
            <button
              onClick={deletePlanInfo}
              type="button"
              className="plan_detail_btn_delete fs-20 notoMid flex align-center justify-center"
            >
              일정 삭제
            </button>
            <button
              type="button"
              className="plan_detail_btn_modify fs-20 notoMid flex align-center justify-center"
              onClick={openModify}
            >
              일정 수정
            </button>
          </div>
        )}
        {modalVisible && (
          <ModifyPlanModal
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
            planId={planId}
            planName={planInfo.savedTitle}
            // beforeStartDate={planInfo.startDate}
            // beforeEndDate={planInfo.startDate}
          />
        )}
      </div>
    </div>
  );
}

export default PlanDetail;
