const express = require("express");
const {User} = require("../../models/User");
const {auth} = require("../../middleware/auth");

const router = express.Router();

//NOTE: 회원가입
router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.status(400).send('회원가입 실패')
    return res.status(201).json({success: true});
  });
});

//NOTE: 로그인
router.post("/login", (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      return res.status(400).send('이메일이 틀렸습니다.');
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(400).send('비밀번호가 틀렸습니다.');
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

//NOTE: 로그인 인증
router.get("/auth", auth, (req, res) => {
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

//NOTE:로그아웃
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user.id}, {token: ""}, (err, user) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send({success: true});
  });
});

module.exports = router;
