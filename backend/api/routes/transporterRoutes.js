const express = require("express");
const router = express.Router();

const {
  getAllTransporters,
  getTransporterById,
  createTransporter,
  updateTransporter,
  deleteTransporter
} = require("../controllers/transporterController");

const { protected } = require('../middleware/authMiddleware');


router
  .route("/")
  .get(getAllTransporters)
  .post(protected, createTransporter);

router
  .route("/:id")
  .get(getTransporterById)
  .put(protected, updateTransporter)
  .delete(protected, deleteTransporter);

module.exports = router;