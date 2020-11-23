const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const cookies = req.cookies;
  console.log('cookies:', cookies);
  const token = cookies.token;
  console.log('token:', token);

  if (!token) {
    return res.status(401).json({ msg: 'Authorization Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    console.log('req.user:', req.user);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      msg: 'Invalid request!',
    });
  }
};
