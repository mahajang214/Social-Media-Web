const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const { protectedRoute } = require('../Middlewares/protected');
const { followUser, sendPost, getAllPosts, likePost, unlikePost, commentOnPost, searchUser } = require('../Controllers/main.controller');
const multer = require('multer');
// const { upload } = require('../Utilities/utils');
// const uploadRepo=require('../Upload_Data/')

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../Upload_Data');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = crypto.randomBytes(10).toString('hex');
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    }
});

const uploadMiddleware = (req, res, next) => {
    upload.single('image')(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};

// router.get('/',protectedRoute,sendingAllPosp);
router.post('/send', protectedRoute, uploadMiddleware, sendPost);
router.post('/follow/:id', protectedRoute, followUser);
router.get('/', protectedRoute, getAllPosts);
router.post('/like/:id', protectedRoute, likePost);
router.post('/unlike/:id', protectedRoute, unlikePost);
router.post('/comment/:id', protectedRoute, commentOnPost);
router.get('/search/:id',protectedRoute,searchUser);

module.exports = router;