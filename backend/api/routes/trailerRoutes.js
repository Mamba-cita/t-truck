
const express = require("express");
const router = express.Router();

const {
    getAllTrailers,
    getTrailerById,
    createTrailer,
    updateTrailer,
    deleteTrailer
  } = require("../controllers/trailerController");

  const { protected } = require('../middleware/authMiddleware');


router.route("/").get(getAllTrailers).post(protected, createTrailer);

router
  .route("/:id")
  .get(getTrailerById)
  .put(protected, updateTrailer)
  .delete(protected, deleteTrailer);

module.exports = router;

