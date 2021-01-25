const express = require("express");
const fs = require("fs");
const productController = require("../../controllers/product");
const {uploadImg} = require("../../middleware/uploads");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (e) {
  console.log("폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

//NOTE:이미지 저장
router.post("/image", uploadImg.array("image"), productController.saveImage);

//NOTE: 상품등록
router.post("/add", productController.addProduct);

//NOTE:모든상품정보
router.post("/load", productController.loadProducts);

//NOTE:디테일상품정보
router.get("/detail/:id", productController.loadProduct);

module.exports = router;
