const request = require("supertest");
const app = require("../../index");
const uuid = require("uuid");

//NOTE: USER

const newUser = {email: uuid.v4(), password: "12345"};
let userCookie;
let loginnedId;
describe("POST /api/user/register", () => {
  it("should be created", async () => {
    const res = await request(app).post("/api/user/register").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBeTruthy();
  });
  it("should hadle Error 400", async () => {
    const res = await request(app)
      .post("/api/user/register")
      .send({email: "yhg03"});
    expect(res.statusCode).toBe(400);
  });
  it("should return 500", async () => {
    const res = await request(app)
      .post("/api/user/register")
      .send({email: "yhg03", password: "2"});

    expect(res.statusCode).toBe(500);
    expect(res.body).toStrictEqual({
      message:
        "User validation failed: password: Path `password` (`2`) is shorter than the minimum allowed length (5).",
    });
  });
});

describe("POST /api/user/login", () => {
  it("should return 400 error", async () => {
    const res = await request(app)
      .post("/api/user/login")
      .send({email: "yhg03", password: "2"});

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("이메일이 틀렸습니다.");
  });
  it("should be login", async () => {
    const res = await request(app).post("/api/user/login").send(newUser);

    userCookie = res.header["set-cookie"];
    loginnedId = res.body.userId;
    expect(res.statusCode).toBe(200);
    expect(res.body.loginSuccess).toBe(true);
  });
});

describe("GET /api/user/auth", () => {
  it("should be auth", async () => {
    const res = await request(app)
      .get("/api/user/auth")
      .set("Cookie", userCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(loginnedId);
  });
  it("should return 500 Error", async () => {
    const res = await request(app).get("/api/user/auth");

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("다시로그인 해주세요");
  });
});

describe("GET /api/user/logout", () => {
  it("should be logout", async () => {
    const res = await request(app)
      .get("/api/user/logout")
      .set("Cookie", userCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
  it("should return 500 Error", async () => {
    const res = await request(app).get("/api/user/logout");

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe("다시로그인 해주세요");
  });
});

//NOTE: PRODUCT

let productId;

describe("POST /api/product/add", () => {
  const newProduct = {
    writer: "600193616250be2d49435896",
    title: "test",
    description: "123333",
    price: 123,
  };
  it("should add and load products", async () => {
    const res = await request(app).post("/api/product/add").send(newProduct);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("test");
    productId = res.body._id;
  });

  it("should handle Error 500", async () => {
    const res = await request(app).post("/api/product/add").send({writer: 111});
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("상품등록 실패");
  });
});
describe("POST /api/product/load", () => {
  it("should return 8 array", async () => {
    const res = await request(app)
      .post("/api/product/load")
      .send({filters: {}, loadMore: false});
    expect(res.statusCode).toBe(200);
    expect(res.body.product.length).toBe(8);
    expect(res.body.loadMore).toBe(false);
  });
  it("should contain searchValue", async () => {
    const res = await request(app)
      .post("/api/product/load")
      .send({filters: {}, searchValue: "4444", loadMore: false});
    expect(res.statusCode).toBe(200);
    expect(res.body.product[0].title).toBe("4444");
  });
});
describe("GET /api/products/detaul/:id", () => {
  it("should return detail data", async () => {
    const res = await request(app).get(`/api/product/detail/${productId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(productId);
  });
  it("should handle error", async () => {
    const res = await request(app).get("/api/product/detail/1");
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe("상품정보 조회에 실패하였습니다.");
  });
});

//NOTE: PAYMENT  - 카드통합테스트 만들고 카트 아이템에 추가한다음 실행
describe("POST /api/payment/paypal", () => {
  it("should handle Error", async () => {
    const res = await request(app).post("/api/payment/paypal").send({});
    expect(res.statusCode).toBe(500);
  });
});
