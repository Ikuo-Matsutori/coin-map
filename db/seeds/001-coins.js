exports.seed = async function (knex) {
  await knex("coins").del();
  await knex("coins").insert([
    {
      id: 1,
      ticker_symbol: "???",
      quantity: 1,
      unit_price: 0,
      total_price: 0,
      wallet: "Metamask",
    },
  ]);
};
