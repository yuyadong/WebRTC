import React from "react";

const Button = ({ buttonText, cancelButton = false, onClickHandleer }) => (
  <button
    className={
      cancelButton ? "join_room_cancle_button" : "join_room_success_button"
    }
    onClick={onClickHandleer}
  >
    {buttonText}
  </button>
);

const JoinRoomButtons = ({ isRoomHost, onClickHandleer }) => {
  const handleJoinRoom = () => {};

  return (
    <div className="join_room_buttons_container">
      <Button
        buttonText={isRoomHost ? "主持" : "加入"}
        onClickHandleer={handleJoinRoom}
      />
    </div>
  );
};

export default JoinRoomButtons;
