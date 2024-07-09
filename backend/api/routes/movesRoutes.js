const express = require("express");
const router = express.Router();

const {
  getMoveById,
  getAllMoves,
  createMove,
  updateMove,
  deleteMove,
} = require("../controllers/movesController");

const { protected } = require('../middleware/authMiddleware');

router.route("/").get(getAllMoves).post(protected, createMove);

router
  .route("/:id")
  .get(getMoveById)
  .put(protected, updateMove)
  .delete(protected, deleteMove);

module.exports = router;
