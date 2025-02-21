const express=require('express');
const { getUsers } = require('../Controllers/chat.controller');
const { protectedRoute } = require('../Middlewares/protected');

const router=express.Router();

router.get("/",protectedRoute,getUsers);
router.post("/send/:id",protectedRoute,sendMessage);



module.exports=router