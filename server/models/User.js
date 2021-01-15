const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
userSchema.methods.generateToken = function (cb) {
  let user = this;
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  jwt.verify(token, "secretToken", function (err, decoded) {
    user.findOne({_id: decoded, token: token}, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
const User = mongoose.model("User", userSchema);
module.exports = {User};
