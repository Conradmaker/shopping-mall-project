const productController = require("../../controllers/product");
const {Product: productModel} = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const {newProduct} = require("../data/productData");

let req;
let res;
let next;
productModel.create = jest.fn();
productModel.findOne = jest.fn();
productModel.populate = jest.fn();
productModel.find = jest.fn();
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("SAVE IMAGE", () => {
  it("should be function", () => {
    expect(typeof productController.saveImage).toBe("function");
  });
  it("should be return 201", () => {
    req.files = [{path: 1}, {path: 2}];
    productController.saveImage(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual([1, 2]);
  });
});
describe("ADD PRODUCT", () => {
  it("should be function", () => {
    expect(typeof productController.addProduct).toBe("function");
  });
  it("should call Product.create", async () => {
    req.body = newProduct;
    await productController.addProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });
  it("should return 201 with JSON", async () => {
    req.body = newProduct;
    productModel.create.mockReturnValue(newProduct);
    await productController.addProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual(newProduct);
  });
  it("should handle Error", async () => {
    const errorMsg = {message: ""};
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.addProduct(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe("상품등록 실패");
  });
});
describe("LOAD ALL PRODUCTS", () => {
  let limit;
  let skip;
  let populate;
  let find;
  beforeAll(() => {
    find = jest.fn();
    limit = jest.fn();
    populate = jest.fn();
    skip = jest.fn();
    productModel.find.mockReturnValue({populate, find});
    find.mockReturnValue({populate});
    populate.mockReturnValue({skip});
    skip.mockReturnValue({limit});
    limit.mockReturnValue({});
    req = httpMocks.createRequest();
  });
  it("should be function", () => {
    expect(typeof productController.loadProducts).toBe("function");
  });

  it("limit&skip is empty limit should called with 8,0", async () => {
    req.body = {filters: {}, loadMore: false};
    await productController.loadProducts(req, res, next);
    expect(productModel.find).toBeCalledWith({});
    expect(populate).toBeCalledWith("writer");
    expect(skip).toBeCalledWith(0);
    expect(limit).toBeCalledWith(8);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({product: {}, loadMore: false});
  });

  it("limit&skip is exist should called with ", async () => {
    req.body = {filters: {}, skip: 5, limit: 5, loadMore: false};
    await productController.loadProducts(req, res, next);
    expect(productModel.find).toBeCalledWith({});
    expect(populate).toBeCalledWith("writer");
    expect(skip).toBeCalledWith(5);
    expect(limit).toBeCalledWith(5);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({product: {}, loadMore: false});
  });
  it("should find search when searchValue is defined", async () => {
    req.body = {filters: {}, searchValue: "test", loadMore: false};
    await productController.loadProducts(req, res, next);
    expect(productModel.find).toBeCalledWith({});
    expect(find).toBeCalledWith({$text: {$search: "test"}});
  });
  it("should filter when price , continents are defined", async () => {
    req.body = {filters: {continents: ["a"], price: [1, 2]}, loadMore: false};
    await productController.loadProducts(req, res, next);
    expect(productModel.find).toBeCalledWith({
      continents: ["a"],
      price: {$gte: 1, $lte: 2},
    });
  });
  it("should handle Error", async () => {
    req.body = {filters: {}, loadMore: false};
    const errorMsg = {message: ""};
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.find.mockReturnValue(rejectedPromise);
    await productController.loadProducts(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe("상품조회 실패");
  });
});

describe("LOAD PRODUCT DETAIL", () => {
  it("should be function", () => {
    expect(typeof productController.loadProduct).toBe("function");
  });
  it("should call findOne and populate", async () => {
    req.params = {id: "mockedId"};
    const populate = jest.fn();
    productModel.findOne.mockReturnValue({populate});
    await productController.loadProduct(req, res, next);
    expect(productModel.findOne).toBeCalledWith({_id: "mockedId"});
    expect(populate).toBeCalledWith("writer");
  });
  it("should return productDetail", async () => {
    req.params = {id: "mockedId"};
    const populate = jest.fn();
    productModel.findOne.mockReturnValue({populate});
    populate.mockReturnValue(newProduct);
    await productController.loadProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(newProduct);
  });
  it("should handle Error", async () => {
    const errorMsg = {message: ""};
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.findOne.mockReturnValue(rejectedPromise);
    await productController.loadProduct(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe("상품정보 조회에 실패하였습니다.");
  });
});
