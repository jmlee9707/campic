import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddPlanModal.scss";
import { useSelector } from "react-redux";
import { changePlan } from "../../apis/plan";
import useOutSideClick from "../../utils/useOutSideClick";

function Modal({ onClose, planId, planName }) {
  const navigate = useNavigate();
  const email = useSelector(state => state.user.email);
  const [text, setText] = useState(planName);

  const handleClose = () => {
    onClose();
  };
  const modalRef = useRef(null);
  const tripRef = useRef(""); 
  useOutSideClick(modalRef, handleClose); 

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChange = e => {
    setText(e.target.value);
  };

  const modifyPlan = async () => {
    if (text !== "" && text != null) {
      await changePlan(planId, startDate, endDate, text);
      navigate("/plan");
    } else {
      alert("여행 이름을 입력해주세요");
    }
  };

  return (
    <div className="overlay">
      <div
        ref={modalRef}
        className="modal flex column align-center justify-center"
      >
        {email !== null && (
          <div className="modal_body flex column align-center justify-center">
            <div className="modal_body_txt flex column align-center">
              <div className="modal_body_txt_title notoBold fs-32">
                일정수정
              </div>
              <div className="modal_body_txt_days flex align-center notoMid fs-24">
                날짜 :
                <div className="flex modal_body_txt_days_select flex ">
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy/MM/dd"
                    className="calen notoMid fs-22"
                  />
                  ~
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy/MM/dd"
                    className="calen notoMid fs-22"
                  />
                </div>
              </div>
              <div className="modal_body_txt_trip notoMid fs-24">
                제목 :
                <input
                  className="fs-24 notoMid modal_body_txt_trip_input"
                  ref={tripRef}
                  placeholder={planName}
                  value={text}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal_body_btn flex">
              <button
                type="button"
                className="modal_body_btn_add notoBold fs-18 flex align-center justify-center"
                onClick={modifyPlan}
              >
                일정 수정
              </button>
              <button
                type="button"
                className="modal_body_btn_close notoBold fs-18 flex align-center justify-center"
                onClick={handleClose}
              >
                창 닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
