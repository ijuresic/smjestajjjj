const jwt = require('jsonwebtoken');

const userFromToken = (req) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token,'baba');
  return decoded;
};

module.exports = userFromToken;
