// const request = require("supertest");
// const app = require("../../index");

// // describe("POST /api/products/image", () => {
// //   it("should be saveImage", async () => {
// //     const filePath = `${__dirname}/../data/testfile.txt`;
// //     try {
// //       console.log(filePath);
// //       fs.accessSync(filePath);
// //     } catch (e) {
// //       throw new Error("file does not exist");
// //     }
// //     const res = await request(app)
// //       .post("/api/products/image")
// //       .attach("file", file);
// //     expect(res.statusCode).toBe(201);
// //     expect(res.body).toEqual("");
// //   });
// // });
// const newProduct = {
//   writer: "600193616250be2d49435896",
//   title: "test",
//   description: "123333",
//   price: 123,
// };
// describe("POST /api/product/add", () => {
//   it("should add and load products", async () => {
//     const res = await request(app).post("/api/product/add").send(newProduct);
//     expect(res.statusCode).toBe(201);
//     expect(res.body.title).toBe("test");
//     productId = res.body._id;
//   });

//   it("should handle Error 500", async () => {
//     const res = await request(app).post("/api/product/add").send({writer: 111});
//     expect(res.statusCode).toBe(400);
//     expect(res.text).toBe("상품등록 실패");
//   });
// });
// describe("POST /api/product/load", () => {
//   it("should return 8 array", async () => {
//     const res = await request(app)
//       .post("/api/product/load")
//       .send({filters: {}, loadMore: false});
//     expect(res.statusCode).toBe(200);
//     expect(res.body.product.length).toBe(8);
//     expect(res.body.loadMore).toBe(false);
//   });
//   it("should contain searchValue", async () => {
//     const res = await request(app)
//       .post("/api/product/load")
//       .send({filters: {}, searchValue: "4444", loadMore: false});
//     expect(res.statusCode).toBe(200);
//     expect(res.body.product[0].title).toBe("4444");
//   });
// });
// describe("GET /api/products/detaul/:id", () => {
//   it("should return detail data", async () => {
//     const res = await request(app).get(`/api/product/detail/${productId}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body._id).toBe(productId);
//   });
//   it("should handle error", async () => {
//     const res = await request(app).get("/api/product/detail/1");
//     expect(res.statusCode).toBe(400);
//     expect(res.text).toBe("상품정보 조회에 실패하였습니다.");
//   });
// });

it("should", () => {
  expect(1).toBe(1);
});
