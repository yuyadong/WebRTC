import io from "socket.io-client";
import * as webRTCHandler from "./webRTCHandler";
import store from "../store";
import { setRoomId, setParticipants } from "../store/actions";

const SERVER = "http://localhost:5000";

let socket = null;

// 客户端链接 socket.io 服务器
export const connectWithSocketIOServer = () => {
  socket = io(SERVER);
  socket.on("connect", () => {
    console.log(`客户端成功链接socket.IO服务器${socket.id}`);
  });

  socket.on("room-id", ({ roomId }) => {
    store.dispatch(setRoomId(roomId));
  });

  socket.on("room-update", ({ connectedUsers }) => {
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on("conn-prepare", ({ connUserSocketId }) => {
    // 已经存在于房间的用户准备 webRTC 对等链接
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
    // 通知发起方我已经准备完毕可以进行 webRTC 链接
    socket.emit("conn-init", { connUserSocketId });
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSinglingData(data);
  });

  socket.on("conn-init", ({ connUserSocketId }) => {
    // 接收方的 socketId
    // 已经存在于房间的用户准备 webRTC 对等链接
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("user-disconected", (data) => {
    webRTCHandler.removePeerConnection(data);
  });
};
// 主持人创建会议房间
export const createNewRoom = (identity) => {
  // 向服务器发送创建会议房间数据（事件）
  const data = {
    identity,
  };
  socket.emit("create-new-room", data);
};

// 加入房间
export const joinRoom = (roomId, identity) => {
  // 向服务器发送加入会议房间数据（事件）
  const data = {
    roomId,
    identity,
  };
  socket.emit("join-room", data);
};

// 将信令数据发送到服务器
export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
