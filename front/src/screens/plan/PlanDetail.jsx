import React from "react";
import "./PlanDetail.scss";
// import PlanCard from "@components/plan/PlanCard";
import mainImg from "@images/temp_1.jpeg";
import TodoItemList from "@components/plan/TodoItemList";
import Location from "@components/common/Location";

function PlanDetail() {
  const name = "9조 체고 파이팅";
  const start = "2022.07.17";
  const end = "2022.07.19";
  const campName = "수완동 캠핑장";
  const address = "광주광역시 광산구 수완동 1111-1111";
  const phone = "010-0000-0000";

  // const [todoList, setTodoList] = useState([]);

  return (
    <div className="container flex justify-center">
      <div className="plan_detail">
        <div className="plan_detail_title notoBold fs-40">{name}</div>
        <div className="plan_detail_days roBold fs-20">
          {start} ~ {end}
        </div>
        <div className="plan_detail_box flex">
          <div className="plan_detail_box_right">
            <div className="plan_detail_box_right_img">
              <img src={mainImg} alt="coverImg" />
            </div>
            <p className="plan_detail_box_right_campName notoBold fs-30">
              {campName}
            </p>
            <p className="plan_detail_box_right_address fs-20 notoMid">
              {address}
            </p>
            <p className="plan_detail_box_right_phone fs-20 notoMid">{phone}</p>
          </div>
          <div className="plan_detail_box_left">
            <TodoItemList />
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
