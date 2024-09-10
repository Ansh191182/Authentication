const User = require('../modles/user');
const express  = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { genrateToken} = require('../jwt');

router.post('/register' , async(req , res) =>{
  try {
    const {name , email , password , tc } = req.body  //Extract data from the data base
     //check if all the fields are required

     if(!name || !email || !password){
      return res.status(400).json({message: 'Name , email , password are required'});
     }
     //check if the user already exist

     const user =  await User.findOne({email});
     if(user){
      return res.status(400).json({message: 'User already exist'})
     }
     // genrate aspassword
     const hashepassword = await bcrypt.hash(password , 10);

     // genrating the token when the user register is first time on the site

     const payload = {email};
     const token = genrateToken(payload);
    //  //console.log("token is:-"  , token);

    // genrate cookie

    res.cookie("userCookie is:" , token);

      // create the new user 

      const newUser = new User({
        name,
        email,
        password:hashepassword,
      })
 
      await newUser.save();
     
     res.status(200).json({message: 'USer created successfully' , user:{
      _id: newUser.id,
      name:newUser.name,
      email:newUser.email,
      password:newUser.password,
      token: token

     }}
     )
  } catch (error) {
    console.log(error);
    res.status(400).json({error: 'Internal server'})
  }
})


module.exports = router;