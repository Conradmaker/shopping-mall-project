//NOTE:인증처리를 하는 미들웨어

const {User} = require("../models/User");

const auth = (req, res, next) => {
  //클라이언트 쿠키에서 토큰가져오기
  console.log(11);
  const token = req.cookies.x_auth;
  //토큰복호화한 후 유저찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({isAuth: false, error: true});

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = {auth};
