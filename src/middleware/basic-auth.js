const AuthService = require('../services/auth');

function requireAuth(req, res, next){
  const { username, password } = req.body;

  if(!username || !password){
    return res.status(401).json({error: 'Unauthorized request'});
  }

  AuthService.getUserWithUsername(req.app.get('db'), username)
    .then(user => {
      if(!user) {
        return res.status(401).json({error: 'Unauthorized request'});
      }
      return AuthService.comparePasswords(password, user.password)
        .then(passwordsMatch => {
          if (!passwordsMatch) {
            return res.status(401).json({error: 'Unauthorized request'});
          }

          req.user = user;
          next();
        });
    })
    .catch(next);
}

module.exports = {
  requireAuth,
};