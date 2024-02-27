const mongoose = require("mongoose");

// multer is requires for if incase in the situation of giving access to user to createblog
const multer = require("multer");

// importing model
const USER = require("../model/userModels").users;
const BLOGS = require("../model/blogSchema").blogs;
const jwt = require("jsonwebtoken");

const showSignup = (req, res) => {
  res.render("user/signup.hbs");
};

const showLogin = (req, res) => {
  res.render("user/login.hbs");
};

const showHomePage = (req, res) => {
  // had to use projection and skips and other methods if there is alot data in db
  BLOGS.find().then((response) => {
    // passes the data in db in reponses with rendering of data
    res.render("user/home.hbs", { data: response });
  });
};

const doSignup = (req, res) => {
  USER({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .save()
    .then((resp) => {
      res.json({ signup: true });
    })
    .catch(() => {
      res.json({ signup: false });
    });
};

const doLogin = (req, res) => {
  USER.find({
    email: req.body.email,
    password: req.body.password,
  })
    // saves complete details of user to .then parameter
    .then((response) => {
      if (response.length > 0) {
        // (Authentication)creates token with providing userid in db,passing secretkey,expiry
        // 'secretkey' is a credential data which is added in env file
        const token = jwt.sign(
          { userID: response[0]._id },
          process.env.JWT_KEY,
          { expiresIn: "2d" }
        );

        //  after generating the token .sends as a cookie to the client side
        res.cookie("userJwt", token, {
          httpOnly: true,
          samSite: "lax",
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ login: true });
      } else {
        res.json({ login: false });
      }
    });
};

const showDetailedView = (req, res) => {
  res.render("user/detailedView.hbs");
};

// LOGOUT handler //
const logout = (req, res) => {
  // sets the second parameter as null(updating the cookie),apply  this to userAuth.js(isloggedin)too.
  res.cookie("userJwt", null, {
    httpOnly: true,
    samSite: "lax",
    secure: false,
    maxAge: 1,
  });
  req.cookies.userJwt = null;
  res.redirect("/");
};
// user access to createblog
const uploadPage = (req, res) => {
  res.render("user/upload.hbs");
};

// * * * Saving Blogdata in DB  * * * //

const createBlog = (req, res) => {
  // image saving using multer in server(in the static), and refers the path to db
  const fileStorage = multer.diskStorage({
    destination: (req, files, cb) => {
      cb(null, "public/uploads");
    },
    // setting up the name of image files (should be unique)otherwise it would be confusing
    filename: (req, files, cb) => {
      cb(null, Date.now() + "-" + files.originalname);
    },
  });
  // calling the fileStorage function to set the location, and sets the limit of images
  // middleware
  const upload = multer({ storage: fileStorage }).array("images", 4);
  // calls the middleware
  upload(req, res, (err) => {
    BLOGS({
      Heading: req.body.title,
      content: req.body.content,
      images: req.files,
    })
      .save()
      .then((response) => {
        res.redirect("/uploads");
      });
  });
}

// ///

module.exports = {
  showSignup,
  showLogin,
  doSignup,
  doLogin,
  showHomePage,
  showDetailedView,
  logout,
  uploadPage,
  createBlog,
};
