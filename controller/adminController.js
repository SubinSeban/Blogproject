const multer = require('multer')
const mongoose = require('mongoose');

// importing model
const BLOGS = require("../model/blogSchema").blogs;
const USER = require("../model/userModels").users;
const fs = require('fs')
const path = require('path')


const showLogin = (req,res)=>{
    res.render('admin/login.hbs');
}

const showSignUp = (req,res)=>{
    res.render('admin/signup.hbs')
}

const showHomePage = (req, res)=>{
  BLOGS.find().then((response)=>{
    
    res.render('admin/home.hbs',{ data:response });
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
          res.json({ login: true });
        } else {
          res.json({ login: false });
        }
      });
  };

const uploadPage = (req,res)=>{
    res.render('admin/upload.hbs')
   
}
// * * * Saving Blogdata in DB  * * * //

const createBlog = (req,res)=>{
// image saving using multer in server(in the static), and refers the path to db
const fileStorage = multer.diskStorage({
    destination:(req,files,cb) => {
        cb(null,"public/uploads");
        
    },
    // setting up the name of image files (should be unique)otherwise it would be confusing
    filename:(req,files,cb) =>{
       cb(null,Date.now()+"-"+files.originalname)
    }
})
// calling the fileStorage function to set the location, and sets the limit of images
// middleware
const upload = multer({storage:fileStorage}).array("images",4)
// calls the middleware
upload(req,res,(err) => { 
   BLOGS({
       Heading:req.body.title,
       content:req.body.content,
       images:req.files 
   }).save()
   .then((response) =>{
       res.redirect('/admin/uploads')
   })
})
} 

// * * * //


const deletePost =(req,res)=>{
  // checks if there is contents with same as postid in blogs db
  BLOGS.findOne({_id:req.body.postId}).then(selectedfileData => {
// deletes the blog in db in according to the id
   BLOGS.deleteOne({_id:req.body.postId}).then((resp)=>{

  //for loop to delete all the images in server side related to the blog(bcoz we given option to add multiple img in blogs)
    for(let i=0;i< selectedfileData.images.length;i++){
// to delete the files first needed to access the files,(set filepath)
    const filepath = path.join(__dirname,"..","/public/uploads",selectedfileData.images[i].filename);
 //after getting the exact filepath, delete using fs module 
 fs.unlink(filepath,(err)=>{
   
 })
    }
    res.json({delete:true})
   }).catch(err =>{
    res.json({delete:false})
   })
  })
}

// export
 module.exports = {uploadPage , createBlog ,showLogin , doLogin ,doSignup ,showSignUp ,showHomePage , deletePost}