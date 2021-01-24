const {auth} = require("../../middleware/auth");
const httpMocks = require("node-mocks-http");
const {User: userModel} = require("../../models/User");

userModel.findByToken = jest.fn();
let req;
let res;
let next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});
userModel.findByToken = jest.fn();
describe("AUTH MIDDLEWARE", () => {
  it("should be function", () => {
    expect(typeof auth).toBe("function");
  });
  it("should return 500 if token is null", async () => {
    req.cookies = [];
    await auth(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toBe("다시로그인 해주세요");
  });
  it("should return 500 if token is null", async () => {
    req.cookies = [];
    await auth(req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._getData()).toBe("다시로그인 해주세요");
  });
  it("should call findByToken", async () => {
    req.cookies.x_auth = "sjsjsjsjsjsjs";
    await auth(req, res, next);
    expect(userModel.findByToken).toBeCalledWith("sjsjsjsjsjsjs");
  });
  it("should return 400 if token is wrong", async () => {
    req.cookies.x_auth = "sjsjsjsjsjsjs";
    userModel.findByToken.mockReturnValue(null);
    await auth(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({isAuth: false, error: true});
  });
});
