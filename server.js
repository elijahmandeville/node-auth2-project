const express = require("express");

const server = express();
const cookieParser = require("cookie-parser");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const restrict = require("./auth/restrict");

server.use(express.json());
server.use(cookieParser());
server.use("/auth", authRouter);
server.use("/users", restrict("normal"), usersRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "something went wrong",
  });
});

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome!",
  });
});

module.exports = server;
