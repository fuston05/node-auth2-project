const jwt = require('jsonwebtoken');
const { jwtSec } = require('../sec/sec');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, jwtSec, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Invalid credentials" })
      } else {
        req.decodedToken = decodedToken;
        next();
      }//end if error
    })
  } else {
    res.status(401).json({ message: 'You shall not pass!' });
  }//end if else
}//end restricted middleware