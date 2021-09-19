const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  confirmPassword: String,
});

module.exports = mongoose.model("users", UserSchema);