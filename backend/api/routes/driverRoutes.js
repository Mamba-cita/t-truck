const express = require("express");
const router = express.Router();


const {
    getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
  } = require("../controllers/driverController");
  const { protected } = require('../middleware/authMiddleware');


  router
  .route("/")
  .get(getAllDrivers)
  .post(protected, createDriver);

router
  .route("/:id")
  .get(getDriverById)
  .put(protected, updateDriver)
  .delete(protected, deleteDriver);

module.exports = router;