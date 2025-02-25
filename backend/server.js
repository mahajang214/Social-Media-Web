const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const cookieParser=require('cookie-parser')
const cors = require("cors");
const authRoutes = require("../backend/src/Routes/authRoutes");
const mainRoute = require("./src/Routes/mainRoutes");
const chatRoute = require("./src/Routes/chatRoutes");
const connectDB = require("./src/Database/db");
const {createServer}=require('http');
const socketIo = require("socket.io");

const web = express();
const httpServer=createServer(web);
const socketServer=socketIo(httpServer,{
  cors:{
    origin:true,
    credentials:true,
    methods: ["GET", "POST"],
  }
});
connectDB();
// web.use(cookieParser(`${process.env.JWT_SECRET_KEY}`));
web.use(express.json());
web.use(express.urlencoded({ extends: true }));
web.use(cookieParser());

web.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Add this line before your routes
web.use('/uploads', express.static(path.join(__dirname, 'src/Upload_Data')));

web.use("/api/auth", authRoutes);
web.use("/api/main", mainRoute);
web.use("/api/chat", chatRoute);

// const onlineUsers=new Map();

socketServer.on('connection',socket=>{
  console.log("client is connected on socket : ",socket.id);

  socket.on('newMessage',msg=>{
    console.log("new message received on server : ",msg);
    socketServer.emit('newMessage',msg);
  })
  // socket.on('user_online', (userId) => {
  //   // You just store the socketId associated with userId (actual Object ID from DB)
  //   onlineUsers.set(socket.id, { userId, isOnline: true });
  //   console.log(`User with ID ${userId} is online`);

  //   socket.emit('user_list', Array.from(onlineUsers.values()));
  // });
socket.on('onUsers',onId=>{
  console.log("on user list received on server : ",onId);
  socketServer.emit('onUsers',onId);
})

  socket.on('disconnect',()=>{
    console.log("client is disconnected on socket : ",socket.id);
    })
  
})


httpServer.listen(process.env.PORT, () => {
  console.log(`server is connected on port ${process.env.PORT}`);
});
