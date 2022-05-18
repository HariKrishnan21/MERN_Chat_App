const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
connectDb();
const port = process.env.PORT || 6000;
app.use("/api/user/", userRoutes);
app.use("/api/message/", messageRoutes);
const server = app.listen(port, () => {
  console.log(`Server connected successfully at ${port}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:5000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
