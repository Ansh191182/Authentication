const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../modles/user');
const {genrateToken} = require('../jwt');
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;  // Extract email and password from the request body

    // Find User by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "check your email or password and submit again" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: ' email or Password is incorrect, check and submit again' });
    }
    // If both email and password are correct on that case we will genrate a tokn
    
    //genrate the token 

    const payload = {email};
    const token = genrateToken(payload);
      //update tje user record 

      user.token = token;
      await user.save();

      //cookie genrate
      res.cookie("usercookie" , token);
    res.status(200).json({ message: 'User logged in successfully', user: {
      name: user.name,
      email: email,
      password: user.password, // this will return the hashed password
      token:token
    }});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Internal server error' });
  }
});

module.exports = router;
  