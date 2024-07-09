const asyncHandler = require('express-async-handler');
const Expenses = require('../models/Expenses');

// Create a new expense
const createExpense = asyncHandler(async (req, res) => {
  const expense = new Expenses(req.body);
  await expense.save();
  res.status(201).json(expense);
});

// Get all expenses
const getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expenses.find();
  res.status(200).json(expenses);
});

// Get a single expense by ID
const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expenses.findById(req.params.id);
  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.status(200).json(expense);
});

// Update an expense by ID
const updateExpenseById = asyncHandler(async (req, res) => {
  const updatedExpense = await Expenses.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedExpense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.status(200).json(updatedExpense);
});

// Delete an expense by ID
const deleteExpenseById = asyncHandler(async (req, res) => {
  const deletedExpense = await Expenses.findByIdAndDelete(req.params.id);
  if (!deletedExpense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.status(200).json({ message: 'Expense deleted successfully' });
});

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById
};
