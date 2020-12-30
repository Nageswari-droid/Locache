const express = require("express");
const app = express();
const { locache } = require("./Main");

app.use(express.json());
app.use((req, res, next) => {
  req.locache = locache;
  next();
});

app.use((req, res, next) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Accept", "application/json");
  next();
});

app.post("/create", async (req, res) => {
  const { key, value, ttl } = req.body;

  try {
    await req.locache.create(key, value, ttl);
    res.status(201).json({
      message: "Data added to locache!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create new data",
    });
  }
});

app.get("/read/:key", async (req, res) => {
  const key = req.params.key;
  try {
    let value = await req.locache.read(key);
    res.status(201).json({
      [key]: value,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to read data",
    });
  }
});

app.listen(4200);
