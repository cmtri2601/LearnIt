const jwt = require('jsonwebtoken');

//Authorizaion: 'Bearer sometoken_blablablabla'

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: 'Access token not found' });

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ success: false, message: 'Invalid Token' });
  }
};

module.exports = verifyToken;
