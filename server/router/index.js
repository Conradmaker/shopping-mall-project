const express = require("express");

const router = express.Router();

router.use("/user", require("./user/authen"));
router.use("/product", require("./product/product"));

module.exports = router;
