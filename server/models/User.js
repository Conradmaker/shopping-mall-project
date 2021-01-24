const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {type: String, maxLength: 50},
  email: {type: String, trim: true, unique: true},
  password: {type: String, minLength: 5},
  lastname: {type: String, maxLength: 50},
  role: {type: Number, default: 0},
  cart: {type: Array, default: []},
  history: {type: Array, default: []},
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
userSchema.methods.comparePassword = async function (plainPassword) {
  const isMatch = await bcrypt.compare(plainPassword, this.password);
  if (!isMatch) throw new Error("");
  return isMatch;
};

userSchema.methods.generateToken = async function () {
  let user = this;
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  const result = await user.save();
  if (!result) throw new Error("");
  return result;
};

userSchema.statics.findByToken = async function (token) {
  const user = this;
  const decoded = await jwt.verify(token, "secretToken");
  const resultUser = await user.findOne({_id: decoded, token: token});
  if (!resultUser) throw new Error("");
  return resultUser;
};

const User = mongoose.model("User", userSchema);
module.exports = {User};
