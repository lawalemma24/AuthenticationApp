const express = require('express');
const {signup,signin, signout, verifyEmail, forgotPassword,resetPassword, checkAuth} = require('../controllers/userController.js')
const {verifyToken} = require('../middlewares/verifytoken.js')

const router = express.Router();

router.get('/check-auth', verifyToken , checkAuth);
router.post('/signup',signup)
router.post('/signin',signin)
router.post('/signout',signout)
router.post('/verify-email',verifyEmail)
router.post('/forgotpassword',forgotPassword)
router.post('/resetpassword/:token',resetPassword)
module.exports = router;