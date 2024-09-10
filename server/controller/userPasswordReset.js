const express = require('express');
const router = express.Router();
const User = require('../modles/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/resetpassword/:id/:token', async (req, res) => {
  try {
    const { password } = req.body; // extract the user password from the request body
    const { id, token } = req.params; // get the id and token from the URL parameter

    const user = await User.findById(id); // find the user by ID

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const new_secret = user._id + process.env.JWT_SECRET;

    jwt.verify(token, new_secret); // verify the token with the secret

    if (!password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newHashPassword = await bcrypt.hash(password, 10); // hash the new password

    const passwordReset = await User.findByIdAndUpdate(id, { password: newHashPassword }, { new: true }); // update the user's password

    if (!passwordReset) {
      return res.status(500).json({ error: 'Password reset failed' });
    }

    res.status(200).json({ message: 'Your password has been successfully updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
