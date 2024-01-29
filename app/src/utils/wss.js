import io from "socket.io-client";
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
