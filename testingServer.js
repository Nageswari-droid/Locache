const express = require("express");
const app = express();
const { Locache } = require("./Main");

const PORT = process.env.PORT || 4200;

var obj = new Locache(PORT);
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Accept", "application/json");
  next();
});

app.post("/create", async (req, res) => {
  const { filepath, key, value, ttl } = req.body;
  if (filepath) {
    Locache.setFileName(filepath);
  } else {
    Locache.setFileName(" ");
  }
  try {
    await obj.create(key, value, ttl);
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
    let value = await obj.read(key);
    res.status(201).json({
      [key]: value,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to read data",
    });
  }
});

app.get("/delete/:key", async (req, res) => {
  const key = req.params.key;
  try {
    await obj.delete(key);
    res.status(201).json({
      message: `${key} deleted successfully!`,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete data",
    });
  }
});

app.listen(PORT);
