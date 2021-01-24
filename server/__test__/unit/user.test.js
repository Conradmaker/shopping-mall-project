const userController = require("../../controllers/user");
const {User: userModel} = require("../../models/User");
const httpMocks = require("node-mocks-http");
const {
  createUserData,
  requestUserInfo,
  responseAdminUserInfo,
  responseGeneralUserInfo,
} = require("../data/userData");

let req;
let res;
let next;
userModel.create = jest.fn();
userModel.findOne = jest.fn();
userModel.findOneAndUpdate = jest.fn();
userModel.comparePassword = jest.fn();
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("REGISTER", () => {
  it("should be function", () => {
    expect(typeof userController.registerUser).toBe("function");
  });
  it("should return if body is null", async () => {
    await userController.registerUser(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toStrictEqual("회원가입 실패");
  });
  it("should call Product.create and Return success", async () => {
    req.body = createUserData;
    userModel.create.mockReturnValue({success: true});
    await userController.registerUser(req, res, next);
    expect(userModel.create).toBeCalledWith(createUserData);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({success: true});
  });
  it("should Product.create Errors", async () => {
    req.body = createUserData;
    userModel.create.mockReturnValue(null);
    await userController.registerUser(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe("회원가입 실패");
  });
  it("should handle Errors", async () => {
    req.body = createUserData;
    const errorMsg = {message: ""};
    const rejectedPromise = Promise.reject(errorMsg);
    userModel.create.mockReturnValue(rejectedPromise);
    await userController.registerUser(req, res, next);
    expect(next).toBeCalledWith(errorMsg);
  });
});

describe("LOGIN", () => {
  it("should be function", () => {
    expect(typeof userController.loginUser).toBe("function");
  });
  it("should call userModel.findOne", async () => {
    req.body = createUserData;
    await userController.loginUser(req, res, next);
    expect(userModel.findOne).toBeCalledWith({email: req.body.email});
  });
  it("should be return 400 when user does not exist", async () => {
    userModel.findOne.mockReturnValue(null);
    await userController.loginUser(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe("이메일이 틀렸습니다.");
  });
  it("should call comparePassword and fail", async () => {
    req.body = createUserData;
    userModel.findOne.mockReturnValue({
      comparePassword: () => false,
    });
    const result = await userController.loginUser(req, res, next);
    result.comparePassword = jest.fn();
    result.generateToken = jest.fn();
    await result.comparePassword(req.body.password);
    expect(result.comparePassword).toBeCalledWith(req.body.password);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toEqual("비밀번호가 틀렸습니다.");
  });
  it("should be generate token fail", async () => {
    req.body = createUserData;
    userModel.findOne.mockReturnValue({
      comparePassword: () => true,
      generateToken: () => false,
    });
    await userController.loginUser(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toEqual("토큰생성 실패");
  });

  it("should be success return with Cookie", async () => {
    req.body = createUserData;
    userModel.findOne.mockReturnValue({
      comparePassword: () => true,
      generateToken: () => ({_id: 1111}),
    });
    await userController.loginUser(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({loginSuccess: true, userId: 1111});
  });

  it("should handle Errors", async () => {
    req.body = createUserData;
    const errorMsg = {message: ""};
    const rejectedPromise = Promise.reject(errorMsg);
    userModel.findOne.mockReturnValue(rejectedPromise);
    await userController.loginUser(req, res, next);
    expect(next).toBeCalledWith(errorMsg);
  });
});
describe("AUTH", () => {
  it("should be function", () => {
    expect(typeof userController.authUser).toBe("function");
  });
  it("should return Admin userInfo", async () => {
    req.user = requestUserInfo;
    await userController.authUser(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(responseAdminUserInfo);
  });
  it("should return general userInfo", async () => {
    req.user = requestUserInfo;
    req.user.role = 0;
    await userController.authUser(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(responseGeneralUserInfo);
  });
});

describe("LOGOUT", () => {
  beforeEach(() => {
    req.user = {};
    req.user.id = "1231231232";
  });
  it("should be function", () => {
    expect(typeof userController.logoutUser).toBe("function");
  });
  it("should call findOneAndUpdate", async () => {
    userModel.findOneAndUpdate.mockReturnValue(true);
    await userController.logoutUser(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({success: true});
  });
  it("should handle findOneAndUpdate error", async () => {
    userModel.findOneAndUpdate.mockReturnValue(null);
    await userController.logoutUser(req, res, next);
    expect(res.statusCode).toBe(400);
  });
  it("should handle Error", async () => {
    const errorMsg = {message: ""};
    const rejectedPromise = Promise.reject(errorMsg);
    userModel.findOneAndUpdate.mockReturnValue(rejectedPromise);
    await userController.logoutUser(req, res, next);
    expect(next).toBeCalledWith(errorMsg);
  });
});
