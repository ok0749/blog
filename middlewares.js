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

// pagination
function pagination(model) {
  return async (req, res, next) => {
    let page = req.query.page;
    page = page ? parseInt(page) : 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalPost = await model.countDocuments();
    const results = {};

    results.pages = Math.ceil(totalPost / limit);
    results.current = page;

    if (endIndex < totalPost) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.results = await model
        .find()
        .sort({ createdAt: "desc" })
        .limit(limit)
        .skip(startIndex)
        .populate("author", ["name", "avatar"]);
      res.pagination = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = {
  loggedInMiddleware,
  authorizationMiddleware,
  pagination,
};
