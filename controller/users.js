const bcrypt = require("bcrypt");
const User = require("../models/users");

async function loginPage(req, res) {
  res.render("login");
}

async function joinPage(req, res) {
  res.render("join");
}

async function join(req, res, next) {
  const { name, userId, password, rePassword } = req.body;
  const userExist = await User.exists({ userId });

  if (userExist)
    return res.status(400).render("join", { message: "Id already exist" });
  if (password !== rePassword)
    return res.status(400).render("join", {
      message: "Password does not match",
    });

  let user = new User({
    userId,
    password,
    name,
  });

  try {
    user = await user.save();
    req.session.loggedIn = true;
    req.session.user = {
      id: user.id,
      userId: user.userId,
      name: user.name,
      avatar: user.avatar,
    };
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
}

async function login(req, res) {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });

  if (!user || !bcrypt.compare(password, user.password))
    return res
      .status(400)
      .render("login", { message: "Invalid Id or Password" });

  req.session.loggedIn = true;
  req.session.user = {
    id: user.id,
    userId: user.userId,
    name: user.name,
    avatar: user.avatar,
  };
  res.redirect("/");
}

async function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

module.exports = {
  loginPage,
  joinPage,
  join,
  login,
  logout,
};
