const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { diskStorage } = require('multer')
const {Product} = require('../../models/Product')

const router = express.Router()

try {
    fs.accessSync("uploads"); 
  } catch (e) {
    console.log("폴더가 없으므로 생성합니다.");
    fs.mkdirSync("uploads");
  }

const upload = multer({
    storage:diskStorage({destination(req,file,done){
        done(null,'uploads')
    },filename(req,file,done){
        const ext = path.extname(file.originalname)
        const basename = path.basename(file.originalname,ext)
        done(null, basename + new Date().getTime() + ext)
    }}),
    limits: { fileSize: 20 * 1024 * 1024 }
})

//NOTE:이미지 저장
router.post('/image',upload.array('image'),(req,res)=>{
    res.status(201).json(req.files.map(v=>v.path))
})

router.post('/add',async(req,res,next)=>{
    try {
       const product = new Product(req.body)
       await product.save()
       res.status(201).json(product)
    } catch (e) {
        res.status(400).send('상품등록 실패')
    }
})

module.exports = router