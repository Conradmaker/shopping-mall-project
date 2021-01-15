const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const app = express();
const port = 8000;
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("mongodb 연결"))
  .catch(() => console.error("몽고디비 연결 실패"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => res.send("hello  world111!"));
app.use("/api", require("./router"));
app.listen(port, () => {
  console.log(`${port}포트에서 서버가 실행되었습니다.`);
});
