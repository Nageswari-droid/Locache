const express = require("express");
const app = express();
const { locache } = require("./Main");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Accept", "application/json");
  next();
});

app.post("/locachetest", async (req, res) => {
  const { key, value, ttl } = req.body;

  try {
    await locache.create(key, value, ttl);
    res.status(201).json({
      message: "Data added to locache!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create new data",
    });
  }
});

app.listen(4200);
