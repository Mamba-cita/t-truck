const express = require("express");
const router = express.Router();


const {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpenseById,
    deleteExpenseById
  } = require("../controllers/expensesController");
  const { protected } = require('../middleware/authMiddleware');


  router
  .route("/")
  .get(getAllExpenses)
  .post(protected, createExpense);

router
  .route("/:id")
  .get(getExpenseById)
  .put(protected, updateExpenseById)
  .delete(protected, deleteExpenseById);

module.exports = router;