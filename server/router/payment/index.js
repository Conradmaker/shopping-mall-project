const express = require("express");
const {paypalSuccess} = require("../../controllers/payment");
const {auth} = require("../../middleware/auth");

const router = express.Router();

//NOTE: 페이팔 결제 성공시
router.post("/paypal", auth, paypalSuccess);

module.exports = router;
