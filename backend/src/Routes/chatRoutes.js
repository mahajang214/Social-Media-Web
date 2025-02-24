const express=require('express');
const { getUsers, sendMessage, getMessages, userdata } = require('../Controllers/chat.controller');
const { protectedRoute } = require('../Middlewares/protected');

const router=express.Router();

router.get("/",protectedRoute,getUsers);
router.get('/user',protectedRoute,userdata);
router.post("/send/:id",protectedRoute,sendMessage);
router.get("/recieve/:id",protectedRoute,getMessages);





module.exports=router