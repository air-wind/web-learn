// This file is intentionally left blank.

// const http = require('http');
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello Node.js!\n');
// }).listen(3000);

import express from "express";
import { userRouter } from "./route.js";
const app = express();
// 中间件示例：JSON解析
app.use(express.json());
// 路由示例
// app.get("/api/users", (req, res) => {
//   console.log(JSON.stringify(req.query));
//   res.json([{ id: 1, name: "Alice" }]);
// });

app.use("/api/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
