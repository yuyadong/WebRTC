import Peer from "simple-peer";
import store from "../store";
import { setShowOverlay } from "../store/actions";
import * as wss from "./wss";

const defaultCopnstraints = {
  audio: true,
  video: true,
};

let localSteam = null;

let peers = {};

let streams = [];

export const getLocalPreviewAndInitRoomConnection = (
  isRoomHost,
  identity,
  roomId = null
) => {
  // 采集本地音视频流（获取媒体输入的访问权限）
  navigator.mediaDevices
    .getUserMedia(defaultCopnstraints)
    .then((stream) => {
      console.log("成功获取本地媒体流", stream);
      localSteam = stream;
      // 预览本地视频
      showLocalVideoPreview(localSteam);
      // 隐藏加载动画
      store.dispatch(setShowOverlay(false));
      // 初始化房间链接
      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(roomId, identity);
    })
    .catch((error) => {
      console.log("无法获取本地媒体流！");
      console.log(error);
    });
};

//配置STUN服务器
const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun1.l.google.com:19302",
      },
    ],
  };
};

// 准备 webRTC 对等连接
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  // 实例化对等对象
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localSteam,
  });

  // 信令数据交换
  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId,
    };
    wss.signalPeerData(signalData);
  });

  // 获取媒体流 stream
  peers[connUserSocketId].on("stream", (stream) => {
    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

export const removePeerConnection = ({ socketId }) => {
  const videoContainer = document.getElementById(socketId);
  const videoElement = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoElement) {
    const tracks = videoElement.srcObject.getTracks();

    tracks.forEach((track) => track.stop());

    videoElement.srcObject = null;
    videoContainer.removeChild(videoElement);
    videoContainer.parentNode.removeChild(videoContainer);

    if (peers[socketId]) {
      peers[socketId].destroy();
    }

    delete peers[socketId];
    setTimeout(() => {
      document.getElementById(
        "webpack-dev-server-client-overlay"
      ).style.display = "none";
    }, 20);
  }
};

// 将信令数据添加到接收 webRTC 对等链接转杯的乙方的对等对象中
export const handleSinglingData = (data) => {
  peers[data.connUserSocketId].signal(data.signal);
};

//////////////////////////// Video UI ////////////////////////////

// 显示本地视频
const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_trank_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

// 添加接收的 stream

const addStream = (stream, connUserSocketId) => {
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;
  videoContainer.classList.add("video_trank_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  // 放大缩小视频信息
  videoElement.addEventListener("click", () => {
    if (videoElement.classList.contains("full_screen")) {
      videoElement.classList.remove("full_screen");
    } else {
      videoElement.classList.add("full_screen");
    }
  });

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

//////////////////////////// Button Logic ////////////////////////////
export const toggleMic = (isMuted) => {
  localSteam.getAudioTracks()[0].enabled = isMuted;
};

export const toggleCamera = (isDisabled) => {
  localSteam.getVideoTracks()[0].enabled = isDisabled;
};
