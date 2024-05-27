exports.up = function (knex) {
  return knex.schema.createTable("coins", function (table) {
    table.increments("id").primary();
    table.string("ticker_symbol", 32).notNullable().index();
    table.integer("quantity", 32).notNullable();
    table.integer("unit_price", 32).notNullable();
    table.integer("total_price", 32).notNullable();
    table.string("wallet", 32).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("coins");
};
