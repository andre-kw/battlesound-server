const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authService = {
  getUserWithUsername(db, username) {
    return db('users')
      .where({username})
      .first();
  },

  comparePasswords(pwd, hash) {
    return bcrypt.compare(pwd, hash);
  },

  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256'
    });
  },
};

module.exports = authService;