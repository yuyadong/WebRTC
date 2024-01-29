import store from "../store";
import { setShowOverlay } from "../store/actions";
import { createNewRoom, joinRoom } from "../utils/wss";

const defaultCopnstraints = {
  audio: true,
  video: true,
};

let localSteam = null;

const showLocalVideoPreview = (steam) => {
  // 显示本地视频
};

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
      isRoomHost ? createNewRoom(identity) : joinRoom(roomId, identity);
    })
    .catch((error) => {
      console.log("无法获取本地媒体流！");
      console.log(error);
    });
};
