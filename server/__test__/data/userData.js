const createUserData = {
  email: "yhyhyh0332@naver.com",
  password: "12345",
  name: "testName",
};
const requestUserInfo = {
  id: "userId",
  email: "yhyhyh033@naver.com",
  name: "testName",
  lastname: "testLastName",
  role: 1,
  image: "/uploads/avatar29292000.png",
  cart: [],
  history: [],
};
const responseAdminUserInfo = {
  _id: "userId",
  isAdmin: true,
  isAuth: true,
  email: "yhyhyh033@naver.com",
  name: "testName",
  lastname: "testLastName",
  role: 1,
  image: "/uploads/avatar29292000.png",
  cart: [],
  history: [],
};
const responseGeneralUserInfo = {
  _id: "userId",
  isAdmin: false,
  isAuth: true,
  email: "yhyhyh033@naver.com",
  name: "testName",
  lastname: "testLastName",
  role: 0,
  image: "/uploads/avatar29292000.png",
  cart: [],
  history: [],
};
module.exports = {
  responseGeneralUserInfo,
  createUserData,
  requestUserInfo,
  responseAdminUserInfo,
};
