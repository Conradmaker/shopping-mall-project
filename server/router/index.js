const express = require("express");

const router = express.Router();

router.use("/user", require("./user/authen"));
router.use("/cart", require("./user/cart"));
router.use("/product", require("./product/product"));
router.use("/payment", require("./payment/index"));

module.exports = router;
