const express = require("express");
const app = express();
const knex = require("./knex.js");
const COINS_TABLE = "coins";
const axios = require("axios");
require("dotenv").config({
  path: "./.env",
});

console.log(process.env.API_KEY);
app.use("/", express.json());
app.use("/", express.static(__dirname + "/frontend/dist"));

app.get("/api/list", (req, res) => {
  knex
    .select("*")
    .from(COINS_TABLE)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/api/price/:ticker", async (req, res) => {
  const ticker = req.params.ticker;
  await axios
    .get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest", {
      params: {
        symbol: `${ticker}`,
        convert: "JPY",
      },
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
    })
    .then((response) => response.data.data[ticker].quote.JPY.price)
    .then((price) => res.json(price))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/api/list", (req, res) => {
  const newTransaction = req.body;
  console.log(newTransaction);
  knex(COINS_TABLE)
    .insert(newTransaction)
    .then(() => {
      res.status(201).send("Created");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.delete("/api/list/:id", (req, res) => {
  const { id } = req.params;
  knex(COINS_TABLE)
    .where({ id })
    .del()
    .then(() => {
      res.status(204).send("Created");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(3000, () => {
  console.log("server is running 3000");
});
