const express = require("express");
const router = express.Router();


const {
createFuelEntry,
getAllFuelEntries,
getFuelEntryById,
updateFuelEntryById,
deleteFuelEntryById
  } = require("../controllers/fuelController");
  const { protected } = require('../middleware/authMiddleware');


  router
  .route("/")
  .get(getAllFuelEntries)
  .post(protected, createFuelEntry);

router
  .route("/:id")
  .get(getFuelEntryById)
  .put(protected, updateFuelEntryById)
  .delete(protected, deleteFuelEntryById);

module.exports = router;