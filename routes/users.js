var express = require("express");
var router = express.Router();
const userController = require("../controller/users");

/* GET users listing. */
router.get("/login", userController.loginPage);
router.post("/login", userController.login);
router.get("/join", userController.joinPage);
router.post("/join", userController.join);
router.get("/logout", userController.logout);

module.exports = router;
