const express = require("express");
const userController = require("../../controllers/user");
const {auth} = require("../../middleware/auth");
const router = express.Router();

//NOTE: 회원가입
router.post("/register", userController.registerUser);

//NOTE: 로그인
router.post("/login", userController.loginUser);

//NOTE: 로그인 인증
router.get("/auth", auth, userController.authUser);

//NOTE:로그아웃
router.get("/logout", auth, userController.logoutUser);

module.exports = router;
