const bcrypt = require("bcryptjs");

const router = require("express").Router();

const jwt = require("jsonwebtoken");

const usersDb = require("../users/users-model");

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await usersDb.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "username is taken",
      });
    }

    res.status(201).json(await usersDb.addUser(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await usersDb.findBy({ username: req.body.username }).first();
    if (!user) {
      return res.status(401).json({
        message: "Login details were invalid",
      });
    }
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCheck) {
      res.status(401).json({
        message: "invalid credentials",
      });
    }

    const tokenPayload = {
      userId: user.id,
      userRole: "normal",
    };

    res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET));
    res.json({
      welcome: `Welcome ${user.username}!`,
      // token: jwt.sign(tokenPayload, process.env.JWT_SECRET),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
