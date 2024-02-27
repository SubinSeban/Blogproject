const express = require("express");
const router = express.Router();
// importing
const {
  showSignup,
  showLogin,
  doSignup,
  doLogin,
  showHomePage,
  showDetailedView,
  logout,
  uploadPage,
  createBlog
} = require("../controller/userController");
// imports authentication middleware
const userAuth = require("../middleWare/userAuth");

// routing using handler only
router.get("/signup", showSignup);
router.get("/", showLogin);
router.post("/register", doSignup);
router.post("/login", doLogin);


// includes authentication middleware
router.get("/home", userAuth, showHomePage);
router.get("/detailedView", userAuth, showDetailedView);

// to render the page of uploads for usercreation of blogs
router.get("/uploads",userAuth, uploadPage);

router.post("/createblog", createBlog);

// LOGOUT
router.get("/logout", logout);

// exporting the local module
module.exports = router;
