const express = require("express");
const app = express();
const { locache } = require("./Main");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Accept", "application/json");
  next();
});

app.post("/locachetest", (req, res) => {
  const { key, value, ttl } = req.body;
//   console.log(key, value, ttl);
  locache.create(key, value, ttl);
  res.json({
    message: "Data added to locache!",
  });
});

app.listen(4200);
