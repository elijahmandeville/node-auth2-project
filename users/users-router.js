const express = require("express");
const router = express.Router();

const usersDb = require("./users-model");

router.get("/", async (req, res, next) => {
  try {
    const users = await usersDb.getUsers();

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({
        message: "users not found",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
