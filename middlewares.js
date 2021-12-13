// 로그인 전연 변수 설정
const loggedInMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
};

// 권한 확인
const authorizationMiddleware = (req, res, next) => {
  if (req.session.loggedIn) return next();
  res.redirect("/");
};

module.exports = {
  loggedInMiddleware,
  authorizationMiddleware,
};
