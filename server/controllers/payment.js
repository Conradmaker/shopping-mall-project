const {Payment} = require("../models/Payment");
const {Product} = require("../models/Product");
const {User} = require("../models/User");

const paypalSuccess = async (req, res, next) => {
  try {
    let history = [];
    let computedData = {};
    //유저 결제내역에 추가
    req.body.cartDetail.forEach((item) => {
      history.push({
        dataOfPurchase: Date.now(),
        name: item.title,
        id: item._id,
        price: item.price,
        quantity: item.quantity,
        paymentId: req.body.paymentDetail.paymentID,
      });
    });

    //결제컬렉션에 추가
    computedData.user = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };
    computedData.data = req.body.paymentDetail;
    computedData.product = history;
    console.log(computedData);
    await User.findOneAndUpdate(
      {_id: req.user.id},
      {$push: {history}, $set: {cart: []}},
      {new: true}
    );
    const payment = await Payment.create(computedData);
    //상품에서 판매수 증가

    let products = [];
    payment.product.forEach((item) => {
      products.push({id: item.id, quantity: item.quantity});
    });
    products.forEach(async (item) => {
      await Product.findOneAndUpdate(
        {_id: item.id},
        {
          $inc: {sold: item.quantity},
        },
        {new: false}
      );
    });
    res.status(201).send("결제가 성공적으로 진행되었습니다.");
    next();
  } catch (e) {
    res.status(400).send("결제등록실패");
    next(e);
  }
};

module.exports = {paypalSuccess};
