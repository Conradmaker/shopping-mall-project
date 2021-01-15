const express = require("express");
const mongoose = require("mongoose");
const {User} = require("./models/User");
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const {auth} = require("./middleware/auth");

const app = express();
const port = 8000;
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("mongodb 연결"))
  .catch(() => console.error("몽고디비 연결 실패"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.send("hello  world111!"));
app.post("/api/user/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({success: false, err});
    return res.status(201).json({success: true});
  });
});
app.post("/api/user/login", (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다.",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다",
        });
      }
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id});
      });
    });
  });
});

app.post("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user.id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});
app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user.id}, {token: ""}, (err, user) => {
    if (err) return res.json({success: false, err});
    return res.status(200).send({success: true});
  });
});
app.listen(port, () => {
  console.log(`${port}포트에서 서버가 실행되었습니다.`);
});
