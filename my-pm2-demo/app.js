// app.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("PM2 教学演示成功！");
});

server.listen(3000, () => {
  console.log("服务运行在 http://localhost:3000");
});
