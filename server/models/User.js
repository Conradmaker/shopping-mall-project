const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {type: String, maxLength: 50},
  email: {type: String, trim: true, unique: true},
  password: {type: String, minLength: 5},
  lastname: {type: String, maxLength: 50},
  role: {type: Number, default: 0},
  image: String,
  token: {type: String},
  tokenExp: {type: Number},
});
userSchema.pre("save", async function (next) {
  let user = this;
  //패스워드가 변경될때만 암호화 시킨다.
  if (user.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      next();
    } catch (e) {
      next(e);
    }
  } else {
    next();
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
