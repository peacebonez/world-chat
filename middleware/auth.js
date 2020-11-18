const jwt = require('jsonwebtoken');
require('dotenv').config();

// We need a middleware function that can:

// read the jwt token from the browser cookies
// decode that token and find the corresponding user
// pass on to the route function which user is authenticated

module.exports = (req, res, next) => {
  const token = req.header('cookie');
  console.log('token:', token);

  if (!token) {
    return res.status(401).json({ msg: 'Authorization Denied' });
  }

  try {
    //function makes it into the try block and crashes at const decoded
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('decoded:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      msg: 'Invalid request!',
    });
  }
};
