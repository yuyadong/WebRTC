import React from "react";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import SwitchToScreen from "./SwitchToScreenSharingButton";

const VideoButtons = () => {
  return (
    <div className="video_buttons_container">
      <MicButton />
      <CameraButton />
      <LeaveRoomButton />
      <SwitchToScreen />
    </div>
  );
};

export default VideoButtons;
