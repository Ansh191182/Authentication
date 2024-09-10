const jwt = require('jsonwebtoken');
const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Extract the token from the 'Authorization' header
  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, token not provided' });
  }

  try {
    // Verify the JWT token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the req object
    console.log('Decoded JWT:', decoded); // Add this log
    req.user = decoded;
    console.log(req.user)

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

//funtion to genrate JWt token 

const genrateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // Payload with id and email
    process.env.JWT_SECRET, // Secret key
    { expiresIn: '60d' } // Options (expiration)
  );

};

module.exports = {jwtAuthMiddleware , genrateToken};


// NHAI BHOUT JYADA HI SIMPLE H  JALDI SE ISKO KHATAM KAR LE FIR AAPN REACT PE CHALTE H WO BACHA HUA H USKO YAAD RAKHNA OK ISI BAATH PE "JAI SHREE KRISHN"