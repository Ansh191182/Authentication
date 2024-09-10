const mongoose = require('mongoose');


// ..defining  new Schema

const userSchema  = new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required: true,
  },
  email:{
  type:String,
  required: true,
  unique: true,
  },
  password:{
    type:String,
    required:true,
  },
  tc:{
    type: Boolean,
    // required: true,
  }
})

// creating a models 

const userModel =  mongoose.model("user" , userSchema);
module.exports = userModel;