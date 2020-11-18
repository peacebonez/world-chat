const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  console.log('req:', req);
  const token = req.headers.authorization.split(' ')[1];
  console.log('token:', token);

  if (!token) {
    return res.status(401).json({ msg: 'Authorization Denied' });
  }
  console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({ msg: 'Authorization Denied' });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
