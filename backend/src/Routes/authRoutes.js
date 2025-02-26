const express = require('express');
const { register, login, logout, setProfilePic, setLoginKey, followUser, setInputs } = require('../Controllers/user.controller');
const { protectedRoute } = require('../Middlewares/protected');
const multer = require('multer');
const crypto = require('crypto')
const path = require('path')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../UsersProfilePic');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqFileName = crypto.randomBytes(10).toString('hex');
        const ext = path.extname(file.originalname);
        cb(null, uniqFileName + ext);
    }
});
const upload = multer({ storage: storage });
const uploaderMiddleware = (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });

}

const router = express.Router();



router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/setprofilepic', protectedRoute, uploaderMiddleware, setProfilePic)
router.get('/setloginkey', protectedRoute, setLoginKey);
router.post('/setinputs', protectedRoute, setInputs);





// set profile  kaam baki he
// fill login secret key and send it to user





module.exports = router