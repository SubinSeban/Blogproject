const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schema
const blogSchema = new Schema({
    Heading:{
        type:String,
        required:true,
        default:"no Heading"
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    // //  createdBy:{
    // //     type:

    // },
    content:{
        type:String,
        required:true
    },
    images:[]
})
// model
const blogs = mongoose.model('blogsdata',blogSchema)
module.exports = {blogs}