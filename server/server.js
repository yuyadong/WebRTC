//引入模块
const express = require("express");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

//初始化
const app = express();
const PORT = process.env.PORT || 5000;

//cors包解决跨域访问错误
app.use(cors());

//创建 HTTP 服务器
const server = http.createServer(app);

// 初始化房间和用户
let connectedUsers = [];
let rooms = [];

// 创建路由验证房间是否存在
app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find((room) => room.id === roomId);
  if (room) {
    // 房间存在
    if (room.connectedUsers.length > 3) {
      // 房间人数已满
      return res.send({ roomExisits: true, full: true });
    } else {
      // 房间可以加入
      return res.send({ roomExisits: true, full: false });
    }
  } else {
    // 房间不存在
    return res.send({ roomExisits: false });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`服务器端用户已实现sockte连接${socket.id}`);
  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket);
  });
  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket);
  });
  socket.on("disconnect", () => {
    disconnectHandler(socket);
  });
});

// socket.io handler
const createNewRoomHandler = (data, socket) => {
  console.log("主持人正在创建会议房间");
  console.log(data);
  const { identity } = data;
  const roomId = uuidv4();
  // 创建新用户（进入会议的人）
  const newUser = {
    identity,
    id: uuidv4(),
    roomId,
    socketId: socket.id,
  };

  // 将新用户添加到已连接的用户数组里面
  connectedUsers = [...connectedUsers, newUser];
  // 创建新会议室房间
  const newRoom = {
    id: roomId,
    connectedUsers,
  };
  // 新用户加入会议房间
  socket.join(roomId);
  rooms = [...rooms, newRoom];
  // 向客户端发送数据告知房间已创建完成
  socket.emit("room-id", { roomId });
  // 发送通知告知有新用户加入并更新房间
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

const joinRoomHandler = (data, socket) => {
  const { identity, roomId } = data;

  const newUser = {
    identity,
    id: uuidv4(),
    roomId,
    socketId: socket.id,
  };

  // 判断传递过来的 roomId 是否匹配对应会议房间
  const room = rooms.find((room) => room.id === roomId);
  room.connectedUsers = [...room.connectedUsers, newUser];
  // 加入房间
  socket.join(roomId);
  // 将新用户添加到已连接的用户数组里面
  connectedUsers = [...connectedUsers, newUser];
  // 发送通知告知有新用户加入并更新房间
  io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers });
};

const disconnectHandler = (socket) => {
  // 查询要离开会议房间的用户
  const user = connectedUsers.find((user) => user.socketId === socket.id);
  if (user) {
    // 从会议房间中进行删除
    const room = room.find((room) => room.id === user.id);
    room.connectedUsers = room.connectedUsers.fliter(
      (user) => user.socketId !== socket.id
    );
    // 离开房间
    socket.leave(user.roomId);
    // 当会议房间没人员的时候要关闭会议室
    if (room.connectedUsers.length > 0) {
      io.to(room.id).emit("room-update", {
        connectedUsers: room.connectedUsers,
      });
    } else {
      rooms = rooms.filter((r) => r.id !== room.id);
    }
  }
};

//监听端口号
server.listen(PORT, () => {
  console.log(`服务器正在 ${PORT} 端口号运行...`);
});
