const db = require("../data/config");
const bcrypt = require("bcryptjs");

function getUsers() {
  return db("users").select("id", "username", "department");
}

function getById(id) {
  return db("users").where({ id });
}

function findBy(user) {
  return db("users").where(user);
}

async function addUser(user) {
  user.password = await bcrypt.hash(user.password, 8);

  const [id] = await db("users").insert(user);
  return { id, ...user };
}

module.exports = {
  getUsers,
  addUser,
  getById,
  findBy,
};
