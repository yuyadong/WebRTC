import React from "react";
import { useNavigate } from "react-router-dom";
import ConnectButton from "./ConnectButton";

const ConnectButtons = () => {
  let navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate("/join-room");
  };

  const pushToJoinRoomPageAtHost = () => {
    navigate("/join-room?host=true");
  };
  return (
    <div className="connecting_buttons_container">
      <ConnectButton
        buttonText={`加入会议`}
        onClickHandler={pushToJoinRoomPage}
      />
      <ConnectButton
        createRoomButton
        buttonText={`主持会议`}
        onClickHandler={pushToJoinRoomPageAtHost}
      />
    </div>
  );
};

export default ConnectButtons;
