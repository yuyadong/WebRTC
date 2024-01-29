import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as webRTCHandler from "../../utils/webRTCHandler";
import ParticipantSection from "./ParticipantSection";
import VideoSection from "./VideoSection";
import ChatSection from "./ChatSection";
import RoomLabel from "./RoomLabel";
import Overlay from "./Overlay";
import "./index.css";

const RoomPage = ({ isRoomHost, identity, roomId, showOverlay }) => {
  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
  }, []);

  return (
    <div className="room_container">
      <ParticipantSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
};

const mapStateProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateProps)(RoomPage);
