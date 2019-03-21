const AuthService = require('../services/auth');

function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || '';

  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token'});
  } else {
    bearerToken = authToken.slice(7);
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken);
    AuthService.getUserWithUsername(req.app.get('db'), payload.sub)
      .then(user => {
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request'});

        req.user = user;
        next();
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  } catch(error) {
    res.status(401).json({ error: 'Unauthorized request'});
  }
}

module.exports = {
  requireAuth,
};