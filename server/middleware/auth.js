//NOTE:인증처리를 하는 미들웨어

const {User} = require("../models/User");

const auth = async (req, res, next) => {
  //클라이언트 쿠키에서 토큰가져오기
  const token = req.cookies.x_auth;
  if (!token) return res.status(500).send("다시로그인 해주세요");
  //토큰복호화한 후 유저찾기
  const user = await User.findByToken(token);
  if (!user) return res.status(400).json({isAuth: false, error: true});

  req.token = token;
  req.user = user;
  next();
};

module.exports = {auth};
