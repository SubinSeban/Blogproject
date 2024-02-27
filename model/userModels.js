const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schema(structure for documents)
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{

    type:String,
    required:true
    },
    password:{
        type:String,
        required:true
    }
})

// compile schema into model(interact with db)
const users = mongoose.model('userdata',userSchema);
module.exports = {users}

