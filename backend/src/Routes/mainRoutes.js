const express=require('express');
const { protectedRoute } = require('../Middlewares/protected');
const { followUser } = require('../Controllers/main.controller');


const router=express.Router();

router.get('/',protectedRoute,sendingAllPosp);
router.get('/send/:id',protectedRoute,sendPost);
router.get('/follow/:id',protectedRoute,followUser);
// router.get('/',protectedRoute,sendingAllPost);




module.exports=router;