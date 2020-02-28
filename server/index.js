require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./controllers/authController");
const checkUser = require("./middleware/checkUser");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: SESSION_SECRET
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(db => {
  app.set("db", db);
  console.log("database connected");
  app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
  });
});

//AUTH ENDPOINTS
app.post(`/api/login`, checkUser, authCtrl.login);
app.post(`/api/register`, authCtrl.register);
app.post(`/api/logout`, authCtrl.logout);
app.get(`/api/check`, checkUser);

//PRODUCT ENDPOINTS
app.get(`/api/products`);

//CART ENDPOINTS
app.post(`/api/carts`);
app.get(`/api/carts`);
