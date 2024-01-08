import React from "react";
import { useNavigate } from 'react-router-dom'

const Button = ({ buttonText, cancelButton = false, onClickHandleer }) => (
  <button
    className={
      cancelButton ? "join_room_cancel_button" : "join_room_success_button"
    }
    onClick={onClickHandleer}
  >
    {buttonText}
  </button>
);

const JoinRoomButtons = ({ isRoomHost, handleJoinRoom }) => {
  const navigate = useNavigate()
  const pushToIntroductionPage = () => navigate('/');

  return (
    <div className="join_room_buttons_container">
      <Button
        buttonText={isRoomHost ? "主持" : "加入"}
        onClickHandleer={handleJoinRoom}
      />
      <Button
        buttonText={`取消`}
        onClickHandleer={pushToIntroductionPage}
        cancelButton
      />
    </div>
  );
};

export default JoinRoomButtons;
