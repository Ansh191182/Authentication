const express = require('express');
const router = express.Router();
const bcrypt =  require('bcrypt');
const {jwtAuthMiddleware} = require('../jwt');
const User = require('../modles/user');

router.post('/changepassword', jwtAuthMiddleware, async (req, res) => {
  try {
    const { password } = req.body; // Extract the user password
    console.log('Decoded User:', req.user);
    const userEmail = req.user.email; // Retrieve the email from the JWT payload

    // Hash the new password
    const hashpassword = await bcrypt.hash(password, 10);
    

   
    // Update the user by email instead of userId
    const updateUser = await User.findOneAndUpdate(
      { email: userEmail }, // Find the user by email
      { password: hashpassword }, // Set the new hashed password
      { new: true } // Return the updated document
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Password successfully changed", password: hashpassword });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
module.exports = router;