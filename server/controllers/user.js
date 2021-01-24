const {User} = require("../models/User");

//NOTE: 회원가입
const registerUser = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send("회원가입 실패");
    }
    const user = await User.create(req.body);
    if (!user) return res.status(400).send("회원가입 실패");
    return res.status(201).json({success: true});
  } catch (e) {
    next(e);
  }
};

//NOTE: 로그인
const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(400).send("이메일이 틀렸습니다.");
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("비밀번호가 틀렸습니다.");
    }
    const newUser = await user.generateToken();
    if (!newUser) return res.status(400).send("토큰생성 실패");
    res
      .cookie("x_auth", newUser.token)
      .status(200)
      .json({loginSuccess: true, userId: newUser._id});
  } catch (e) {
    next(e);
  }
};

//NOTE: 로그인 인증
const authUser = (req, res) => {
  res.status(200).json({
    _id: req.user.id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
};

//NOTE:로그아웃
const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({_id: req.user.id}, {token: ""});
    if (!user) return res.status(400).send("로그아웃 실패");
    return res.status(200).json({success: true});
  } catch (e) {
    next(e);
  }
};

module.exports = {registerUser, loginUser, authUser, logoutUser};
