const bcrypt = require("bcrypt");
const User = require("../models/users");

module.exports = {
  loginPage: async function (req, res) {
    res.render("login");
  },

  joinPage: async function (req, res) {
    res.render("join");
  },

  join: async function (req, res, next) {
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
    }

    return res.redirect("/");
  },

  login: async function (req, res) {
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
  },

  logout: async function (req, res) {
    req.session.destroy();
    res.redirect("/");
  },
};
