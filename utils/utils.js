const jwt= require('jsonwebtoken');
const {jwtSec}= require('../config/sec');

module.exports = {
  generateToken
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || 'user',
    department: user.department
  };
  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, jwtSec, options);
}//end generateToken