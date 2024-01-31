import React, { useState } from "react";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import SwitchImg from "../../../resources/images/switchToScreenSharing.svg";

const constrains = {
  audio: false,
  video: true,
};

const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constrains);
      } catch (error) {
        console.log("获取共享屏幕媒体流失败" + error);
      }
      if (stream) {
        setScreenSharingStream(stream);
        setIsScreenSharingActive(true);
      }
    } else {
      setIsScreenSharingActive(false);
      screenSharingStream.getTracks().forEach((track) => track.stop());
      setScreenSharingStream(null);
    }
  };

  return (
    <>
      <div className="video_button_container">
        <img
          src={SwitchImg}
          onClick={handleScreenShareToggle}
          className="video_button_image"
        />
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
};

export default SwitchToScreenSharingButton;
