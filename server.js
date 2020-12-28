const express = require("express");
const app = express();

const router = require("./router/route");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-type", "application/json");
  res.setHeader("Accept", "application/json");
  next();
});

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server created successfully in port ${PORT}`);
});

module.exports = PORT;
