const express =require('express');
const { register, login, logout, setProfilePic, setLoginKey } = require('../Controllers/user.controller');
const { protectedRoute } = require('../Middlewares/protected');


const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.post('/setprofilepic',protectedRoute,setProfilePic)
router.get('/setloginkey',protectedRoute,setLoginKey);


// set profile  kaam baki he
// fill login secret key and send it to user





module.exports=router