const express = require("express");
const router = express.Router();

const create = require("../controller/create");

router.post("/create", create.createController);

module.exports = router;
