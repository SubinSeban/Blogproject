// to fetch user data, use usermodel


const USER = require('../model/userModels').users;
// to communicate with db
const mongoose = require('mongoose')


// pass userID as parameter 
const getUserData = (userID) =>{
    // checking that the userid matching any id in the db,fetches the data
   return USER.find({_id:userID},{password:0})
}

module.exports = getUserData