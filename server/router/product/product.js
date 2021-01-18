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
        next(e)
    }
})

//NOTE:모든상품정조
router.post('/load',async(req,res,next)=>{
    const limit = req.body.limit ? parseInt(req.body.limit):8;
    const skip = req.body.skip?parseInt(req.body.skip):0;
    const {filters:{continents,price},searchValue} = req.body;
    const findArgs = {};
    if(continents.length>0){
        findArgs.continents = continents
    }
    if(price.length>0){
        findArgs.price = {
            $gte:price[0],
            $lte:price[1]
        }
    }
    try {
        if(searchValue.length>0){
            const productInfo= await Product.find(findArgs).find({$text:{$search:searchValue}}).populate("writer").skip(skip).limit(limit);
            res.status(200).json({product:productInfo,loadMore:req.body.loadMore})
        }else{
            const productInfo= await Product.find(findArgs).populate("writer").skip(skip).limit(limit);
            res.status(200).json({product:productInfo,loadMore:req.body.loadMore})
        }
    } catch (e) {
        res.status(400).send('상품조회 실패');
        next(e);
    }
})

//NOTE:디테일상품정보
router.get('/detail/:id',async(req,res,next)=>{
    const type = req.query.type;
    const id = req.params.id

    try {
        const productDetail = await Product.findOne({_id:id}).populate('writer')
        res.status(200).json(productDetail)
    } catch (e) {
        res.status(400).send('상품정보 조회에 실패하였습니다.');
        next(e);
    }
})

module.exports = router