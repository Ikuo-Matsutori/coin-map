exports.up = function (knex) {
  return knex.schema.createTable("coins", function (table) {
    table.increments("id").primary();
    table.string("ticker_symbol", 32).notNullable().index();
    table.decimal("quantity", 14, 4).notNullable();
    table.decimal("unit_price", 14, 4).notNullable();
    table.decimal("total_price", 14, 4).notNullable();
    table.string("wallet", 32).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("coins");
};
