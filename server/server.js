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
