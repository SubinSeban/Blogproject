const express = require('express');
const router = express.Router();
// importing
const {uploadPage,createBlog ,showLogin , doLogin , doSignup ,showSignUp ,showHomePage ,deletePost} = require('../controller/adminController')
// imports authentication middleware
const userAuth = require("../middleWare/userAuth");

router.get('/',showLogin);
router.get('/signUp',showSignUp)
router.post('/register', doSignup);
router.post('/login',doLogin)



router.get('/uploads',userAuth,uploadPage)

router.post('/createBlog',createBlog)

router.get('/home',showHomePage);

router.delete('/deletepost',deletePost)


module.exports= router