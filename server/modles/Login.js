const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({

  email:{
    type: String,
    required: true,
  },
  password:{
    type:String,
    required: true,
  }
})
loginSchema.methods.comparePassword = function(candidatePassword){
  return bcrypt.compare(candidatePassword , this.password);
}

const loginUser = new mongoose.model('loginUser' , loginSchema);
module.exports = loginUser;