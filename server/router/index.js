const express = require("express");

const router = express.Router();

router.use("/user", require("./user/authen"));

module.exports = router;
