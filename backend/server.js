const dotenv=require('dotenv')
dotenv.config();
const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRoutes=require('../backend/src/Routes/authRoutes');
const mainRoute=require('./src/Routes/mainRoutes');
const chatRoute=require('./src/Routes/chatRoutes');
const connectDB=require('./src/Database/db');




const web =express();
connectDB();
web.use(express.json());
web.use(cookieParser());

web.use(cors({
    origin:true,
    methods:['GET','POST'],
    Credential:true
}));


web.use("/api/auth",authRoutes);
web.use("api/main",mainRoute);
web.use("/api/chat",chatRoute);








web.listen(process.env.PORT,()=>{
    console.log(`server is connected on port ${process.env.PORT}`);
    
})