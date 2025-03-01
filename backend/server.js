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
const postsWeb = express();

const httpServer=createServer(web);
const socket2Http=createServer(postsWeb);

const socketServer=socketIo(httpServer,{
  cors:{
    origin:true,
    credentials:true,
    methods: ["GET", "POST"],
  }
});
connectDB();

const socket2Server=socketIo(socket2Http,{
  cors:{
    origin:true,
    credentials:true,
    methods: ["GET", "POST"],
  }
});

// web.use(cookieParser(`${process.env.JWT_SECRET_KEY}`));
web.use(express.json());
web.use(express.urlencoded({ extends: true }));
web.use(cookieParser());

postsWeb.use(express.json());
postsWeb.use(express.urlencoded({ extends: true }));
postsWeb.use(cookieParser());

web.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
postsWeb.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Serve both directories for different purposes
web.use('/uploads/UsersProfilePic', express.static(path.join(__dirname, 'src/Upload_Data/UsersProfilePic')));
web.use('/uploads', express.static(path.join(__dirname, 'src/Upload_Data')));

web.use("/api/auth", authRoutes);
web.use("/api/main", mainRoute);
web.use("/api/chat", chatRoute);

// const onlineUsers=new Map();
postsWeb.use('/',(req,res)=>{
  console.log("soket 2 is working ");
})

socketServer.on('connection',socket=>{
  console.log("client is connected on socket : ",socket.id);

  socket.on('newMessage',msg=>{
    console.log("new message received on server : ",msg);
    socketServer.emit('newMessage',msg);
  })

  socket.on('disconnect',()=>{
    console.log("client is disconnected on socket : ",socket.id);
    })
  
});

socket2Server.on('connection',socket2=>{
  console.log("client is connected on socket 2 : ",socket2.id);

  socket2.on('sendComment',comment=>{
    console.log("comment received on server2 : ",comment);
    socket2Server.emit('sendComment',comment);
  });
  socket2.on('sendPost',post=>{
    console.log("post received on server2 : ",post);
    socket2Server.emit('sendPost',post);
  })

  socket2.on('disconnect',()=>{
    console.log("client is disconnected on socket2 : ",socket2.id);
    })
})


httpServer.listen(process.env.PORT, () => {
  console.log(`server is connected on port ${process.env.PORT}`);
});

socket2Http.listen(process.env.PORT2, () => {
  console.log(`server is connected on port ${process.env.PORT2}`);
});

