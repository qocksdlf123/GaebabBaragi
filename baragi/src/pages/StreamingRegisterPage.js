/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import "./css/StreamingRegisterPage.css"
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function StreamingRegisterPage() {
  const location = useLocation();
  const { id } = useParams();
  const { recipeTitle } = location.state;
  const [roomTitle, setRoomTitle] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [maxParticipant, setMaxParticipant] = useState(2);
  const [password, setPassword] = useState(null);
  const user = useSelector(state=>state.user)
  const navigate = useNavigate();
  // 로그인 안된 유저는 접근 안됨
  useEffect(()=>{
    if (!user) {
      alert('로그인 후 이용해주세요.')
      navigate('/login')
    }
  },[])

  const handleIncrease = (e) => {
    e.preventDefault();
    if (maxParticipant < 5) {
      setMaxParticipant(maxParticipant + 1);
    }
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    if (maxParticipant > 2) {
      setMaxParticipant(maxParticipant - 1);
    }
  };
  // =====================제출======================//
  const handleRegisterSubmit = ()=>{
    const startTime = selectedDate + ' ' + selectedTime
    // let tmpPw = password
    // if (!password) {
    //   tmpPw=password.toString()
    // }
  
    const data = {
      title: roomTitle,
      description: roomDescription,
      password: password,
      max_participant: maxParticipant,
      start_time: startTime,
      recipe_id: parseInt(id),
    };
    console.log(data);

    axios
      .post(process.env.REACT_APP_BASE_URL +"/api/meetings", data)
      .then((response) => {
        // Handle the response if needed
        alert('스트리밍 예약이 완료되었습니다.')
        navigate('/streaming-list');
      })
      .catch((error) => {
        // Handle errors if necessary
        alert(error.response.data)
        console.error("Error sending request:", error.response);
      });
    };

    return (
    <div className="StreamingRegisterContainer">
      <div className="StreamingHeader">
        <h2 className="StreamingRegisterTitle">스트리밍 예약하기</h2>
      </div>
      <div className="input-list">
        <div className="input-info">
          <div className="input-details">
            <div className="input-property">레시피</div>
            <div className="input-content">{recipeTitle}</div>
          </div>
        </div>
      </div>
      <div className="input-list">
        <div className="input-info">
          <div className="input-details">
            <div className="input-property">스트리밍 제목</div>
            <div className="input-content">
              <input
                onChange={(e) => setRoomTitle(e.target.value)}
                type="text"
                placeholder="방 제목을 입력하세요."
                className="roomName"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="input-list">
        <div className="input-info">
          <div className="input-details">
            <div className="input-property">스트리밍 소개</div>
            <div className="input-content">
              <textarea
                onChange={(e) => {
                  setRoomDescription(e.target.value);
                }}
                className="description"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="input-list">
        <div className="input-info">
          <div className="input-details">
            <div className="input-property">스트리밍 시작 시간</div>
            <div className="input-content">
              <input
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                className="startTime"
              />
              <input
                type="time"
                onChange={(e) => setSelectedTime(e.target.value)}
                className="startTime"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="input-list">
        <div className="input-info">
          <div className="input-details">
            <div className="input-property">참가 가능 인원</div>
            <div className="input-content">
              <button
                onClick={handleDecrease}
                disabled={maxParticipant === 1}
                className="minusBtn"
              >
                -
              </button>
              <span className="maxParticipant">{maxParticipant}</span>
              <button
                onClick={handleIncrease}
                disabled={maxParticipant === 5}
                className="plusBtn"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="input-list">
        <div className="input-info">
          <div className="input-details">
            <div className="input-property">비밀번호 설정</div>
            <div className="input-content">
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="password"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="inputContainer">
        
        <div className="inputContainer-left">
          
        </div>
        <div className="inputContainer-right">
          
        
         
          
        </div>
      </div> */}
      <div className="inputContainer-bottom">
        <button onClick={handleRegisterSubmit} className="registerBtn">
          예약
        </button>
      </div>
    </div>
  );
}
export default StreamingRegisterPage;
