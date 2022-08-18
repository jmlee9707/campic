import React, { useState, useEffect } from "react";
import "./PlanDetail.scss";
import TodoItemList from "@components/plan/TodoItemList";
import mainImg from "@images/temp_1.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import Location from "@components/common/Location";
import { getPlanDetail, deletePlan } from "@apis/plan";
import { useSelector } from "react-redux";
import ModifyPlanModal from "@components/camping/ModifyPlanModal";


function PlanDetail() {
  const [planInfo, setPlanInfo] = useState("");
  const { id: planId } = useParams();
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.email);
  const isSocial = useSelector(state => state.user.isSocial);
  const [modalVisible, setModalVisible] = useState(false);

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
  }, []);

  const openModify = () => {
    setModalVisible(true);
  };

  const deletePlanInfo = async () => {
    const check = window.confirm("정말로 삭제하시겠습니까?");
    if (check) {
      const res = await deletePlan(planId);
      console.log(res);
      if (res === "fail") {
        navigate("/plan");
      }
    } else {
      console.log("none");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);


  const shareKakao = () => {

    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
      }
      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${planInfo.savedTitle}`,
          description: `${planInfo.campName}\n주소 : ${planInfo.campAdd1}`,
          imageUrl: `${planInfo.firstImageUrl}`,
          link: {
            mobileWebUrl: `${window.location.href}`,
            webUrl: `${window.location.href}`
          }
        }
      });
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
            {planInfo && planInfo.startDate.substr(0, 10)} ~
            {planInfo && planInfo.endDate.substr(0, 10)}ㅊ
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
            {isSocial === "kakao" && (
              <button type="button"
                onClick={shareKakao}
                className="plan_detail_btn_kakao fs-20 notoMid flex align-center justify-center"
                >
                  카카오톡 공유하기
              </button>
            )}
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
          />
        )}

      </div>
    </div>
  );
}

export default PlanDetail;
