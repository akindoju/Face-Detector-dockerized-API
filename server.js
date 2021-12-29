const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
require("dotenv").config();

const register = require("./Controllers/register.js");
const signin = require("./Controllers/signin.js");
const profile = require("./Controllers/profile.js");
const image = require("./Controllers/image.js");
const auth = require("./Controllers/authorization");

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

// const db = knex({
//   client: "pg",
//   connection: {
//     host: "127.0.0.1",
//     user: "postgres",
//     password: process.env.SERVER_PASSWORD,
//     database: "face-detector1",
//   },
// });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Up and running");
});

app.post("/signin", signin.signinAuthentication(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.post("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});

app.get("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", auth.requireAuth, (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageUrl", auth.requireAuth, (req, res) => {
  image.handleAPICall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
