const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "My blog";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
};

module.exports = localsMiddleware;
