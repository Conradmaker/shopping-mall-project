const request = require("supertest");
const app = require("../../index");
const uuid = require("uuid");

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

    console.log(res);
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
