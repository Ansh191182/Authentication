const express = require('express');
const router = express.Router();
const User = require('../modles/user'); // Corrected typo in model path
const jwt = require('jsonwebtoken');
const  transporter  = require('../config/emailConfig');

router.post('/sendUserPasswordResetEmail', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ error: "email field is required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User is not found' });
    }

    const secret = user._id + process.env.JWT_SECRET;
    const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });

    const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
    console.log(link);   

    //Send Email

    let info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject:"password Reset Link",
      html:`<a href=${link}> Click Here</a> Reset your Password`
    })

    res.status(200).json({
      message: 'User password reset email is sent ... Please check your email', info:info
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' }); // Use 500 for server errors
  }
});

module.exports = router;
