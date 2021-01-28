const httpMocks = require("node-mocks-http");
const paymentController = require("../../controllers/payment");
const {Payment: paymentModel} = require("../../models/Payment");
const {Product: productModel} = require("../../models/Product");
const {User: userModel} = require("../../models/User");

let req;
let res;
let next;
userModel.findOneAndUpdate = jest.fn();
paymentModel.create = jest.fn();
productModel.findOneAndUpdate = jest.fn();
const RealNow = Date.now;
beforeAll(() => {
  global.Date.now = jest.fn(() => new Date("2021-01-28T10:20:30Z").getTime());
});

afterAll(() => {
  global.Date.now = RealNow;
});
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});
describe("PAYPALSUCCESS", () => {
  it("should be function", () => {
    expect(typeof paymentController.paypalSuccess).toBe("function");
  });

  it("should make history array", async () => {
    req.body.cartDetail = [{title: "1", _id: "2", price: 3, quantity: 4}];
    req.user = {_id: "1", name: "2", email: "3", id: "1"};
    req.body.paymentDetail = {paymentID: "111"};

    paymentModel.create.mockReturnValue({product: [{id: 1, quantity: 1}]});
    await paymentController.paypalSuccess(req, res, next);
    console.log(res.statusCode);
    expect(userModel.findOneAndUpdate).toHaveBeenCalled();
    expect(userModel.findOneAndUpdate).toBeCalledWith(
      {_id: req.user.id},
      {
        $push: {
          history: [
            {
              dataOfPurchase: 1611829230000,
              name: "1",
              id: "2",
              price: 3,
              quantity: 4,
              paymentId: "111",
            },
          ],
        },
        $set: {cart: []},
      },
      {new: true}
    );
    expect(paymentModel.create).toBeCalledWith({
      user: {id: "1", name: "2", email: "3"},
      data: {paymentID: "111"},
      product: [
        {
          dataOfPurchase: 1611829230000,
          name: "1",
          id: "2",
          price: 3,
          quantity: 4,
          paymentId: "111",
        },
      ],
    });
    expect(productModel.findOneAndUpdate).toBeCalledWith(
      {_id: 1},
      {
        $inc: {sold: 1},
      },
      {new: false}
    );
    expect(res.statusCode).toBe(201);
    expect(res._getData()).toBe("결제가 성공적으로 진행되었습니다.");
  });
  it("should handle Error", async () => {
    const errMsg = {message: ""};
    const rejectedPromise = Promise.reject(errMsg);
    userModel.findOneAndUpdate.mockReturnValue(rejectedPromise);
    await paymentController.paypalSuccess(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe("결제등록실패");
  });
});
