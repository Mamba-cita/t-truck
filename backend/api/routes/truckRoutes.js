
const express = require("express");
const router = express.Router();


const {
    getTrucks,
    getTruck,
    addTruck,
    updateTruck,
    deleteTruck,
  } = require("../controllers/truckController");

  const { protected } = require('../middleware/authMiddleware');


router.route("/").get(getTrucks).post(protected, addTruck);

router
  .route("/:id")
  .get(getTruck)
  .put(protected, updateTruck)
  .delete(protected, deleteTruck);

module.exports = router;

