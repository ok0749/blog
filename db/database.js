const mongoose = require("mongoose");
const config = require("../config");

module.exports = async function connectDB() {
  return mongoose.connect(config.db.host);
};
