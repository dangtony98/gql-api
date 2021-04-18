const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    // case: Authorization header missing
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    // try to verify token
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // failed to verify token
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    // case: decoded token is null or undefined
    req.isAuth = false;
    return next();
  }

  // case: decoded token is valid - parse userId
  req.isAuth = true;
  req.userId = decodedToken.userId;

  return next();
}