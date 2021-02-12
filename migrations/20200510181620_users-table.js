exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.text("username").notNull().unique();
    table.text("password").notNull();
    table.text("department").notNull();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
