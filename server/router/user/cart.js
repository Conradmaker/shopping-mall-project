const express = require('express')
const { User } = require('../../models/User')
const {auth} = require('../../middleware/auth')
const { Product } = require('../../models/Product')
const router = express.Router()

//NOTE:장바구니추가
router.post('/add',auth,async(req,res,next)=>{
    try {
        const user = await User.findOne({_id:req.user.id})

        const duplicate = user.cart.filter(v=>v.id === req.body.productId).length

        let userInfo
        if(duplicate){
            userInfo = await User.findOneAndUpdate(
                {_id:req.user.id,"cart.id":req.body.productId},
                {$inc:{"cart.$.quantity":1}},
                {new:true}
                )
                res.status(201).json(userInfo.cart)
        }else{
            userInfo = await User.findOneAndUpdate(
                {_id:req.user.id},
                {
                    $push:{
                        cart:{
                            id:req.body.productId,
                            quantity:1,
                            date:Date.now()
                        }
                    }
                },
                {new:true}
            )
            res.status(201).json(userInfo.cart)
        }
    } catch (e) {
        res.status(400).send('상품등록 실패');
        next(e);    
    }
})

//NOTE:장바구니 리스트 
router.get('/load',auth,async(req,res,next)=>{
    try {
        const productIds = req.query.id.split(',')
        const productQts = req.query.qt.split(',')
        const products = await Product.find({_id:{$in:productIds}}).populate('writer')
        const computedPd = products.map((v,i)=>({...v._doc,quantity:parseInt(productQts[i])}))
        res.status(200).json(computedPd)
    } catch (e) {
        res.status(400).send('장바구니 정보를 가져오는 것에 실패하였습니다.');
        next(e);
    }
})

//NOTE:장바구니 삭제
router.get('/remove',auth,async(req,res,next)=>{
    try {
        await User.findOneAndUpdate({_id:req.user._id},{$pull:{'cart':{'id':req.query.id}}})
        res.status(200).json({id:req.query.id})
    } catch (e) {
        res.status(400).send('상품삭제 실패!')
        next(e)
    }
})
module.exports = router