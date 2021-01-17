const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { diskStorage } = require('multer')

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

module.exports = router