const express = require("express");
const router = express.Router();

const {
  allocateMove
} = require("../controllers/allocationController");

const { protected } = require('../middleware/authMiddleware');


router
  .route("/:id")
  .put(protected, allocateMove)

module.exports = router;
