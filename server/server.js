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
let connectedUsers = []
let rooms = []

// 创建路由验证房间是否存在
app.get('/api/room-exists/:roomId', (req,res) => {
  const { roomId } = req.params;
  const room = rooms.find(room => room.id === roomId);
  if (room) {
    // 房间存在
    if (room.connectedUsers.length > 3 ) {
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
})

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//监听端口号
server.listen(PORT, () => {
  console.log(`服务器正在 ${PORT} 端口号运行...`);
});
