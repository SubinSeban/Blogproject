// import express module(third party)
const express = require("express")
//


// instance of express
const app = new express();
// 


// import path module
const path = require('path');
// 


// importing hbs module
const hbs = require('hbs');
// 


// setting the view engine to hbs
app.set("view engine","hbs");
// 


// setting the locatiion of view
app.set('views',path.join(__dirname,"pages"))
// 


// command to set public folder as static
app.use(express.static(path.join(__dirname,"public")));
// 



// importing the local module
const user = require('./routes/user')
const admin = require('./routes/admin')

// import db file
const connectDB = require('./config/dbconfig')

// exuting connectDB function
connectDB();

// import cookieparser
const cookieParser = require("cookie-parser");

// middleware use to convert data into json format,request that comes from client side to server side

app.use(express.urlencoded({ extended:true }));
app.use(express.json())
// important to have cookieparser in the process of authentication(Do not forget)
app.use(cookieParser())
// routing using handler or variable
app.use('/',user)
app.use('/admin',admin)

// 
// install and require/install dotenv ,create file to store credential data's
// configure env file with app.js(main file)
require('dotenv').config()

// creates server(listening to port 3000)
app.listen(5000,()=>{
    console.log("server is listening")
})