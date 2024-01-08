import React from "react";

const ConnectButton = ({
  createRoomButton = false,
  buttonText,
  onClickHandler,
}) => {
  return (
    <button
      className={createRoomButton ? "create_room_button" : "join_room_button"}
      onClick={onClickHandler}
    >
      {buttonText}
    </button>
  );
};

export default ConnectButton;
