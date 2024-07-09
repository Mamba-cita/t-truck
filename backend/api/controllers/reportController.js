const asyncHandler = require("express-async-handler");
const Moves = require("../models/Moves");

const getAllReports = asyncHandler(async (req, res) => {
  try {
    const moves = await Moves.find()
      .populate("truck", "reg")
      .populate("customer", "name")
      .populate("trailer", "reg")
      .populate("driver", "name")
      .exec();

    // Initialize variables to store statistics
    let trucksByStatus = {};
    let totalSalesPerCustomer = {};
    let completeMovesWithInvoiced = 0;
    let totalCargoRateAllMoves = 0;
    let totalTransRateAllMoves = 0;
    let movesWithoutClientPain = [];
    let totalCargoRateWithoutClientPain = 0;
    let movesWithoutTransPaid = [];
    let totalTransRateWithoutTransPaid = 0;
    let movesWithoutGForm = [];
    let movesWithGFormExp = [];
    let totalRemainingTimeGFormExp = 0;
    let movesByCustomer = {};

    // Iterate through moves to calculate statistics
    moves.forEach(move => {
      // Task 1: Count trucks in each status
      if (!trucksByStatus[move.Status]) {
        trucksByStatus[move.Status] = 1;
      } else {
        trucksByStatus[move.Status]++;
      }

      // Task 2: Calculate total sales per customer
      const sales = parseInt(move.cargo_rate) - parseInt(move.trans_rate);
      if (!totalSalesPerCustomer[move.customer]) {
        totalSalesPerCustomer[move.customer] = sales;
      } else {
        totalSalesPerCustomer[move.customer] += sales;
      }

      // Task 3: Count moves with complete status and invoiced value
      if (move.Status === "complete" && move.invoiced) {
        completeMovesWithInvoiced++;
      }

      // Task 4: Calculate total cargo rate for all moves
      totalCargoRateAllMoves += parseInt(move.cargo_rate);

      // Task 5: Calculate total trans rate for all moves
      totalTransRateAllMoves += parseInt(move.trans_rate);

      // Task 6: Identify moves without client pain value
      if (!move.client_pain) {
        movesWithoutClientPain.push(move);
        totalCargoRateWithoutClientPain += parseInt(move.cargo_rate);
      }

      // Task 7: Identify moves without trans paid value
      if (!move.trans_paid) {
        movesWithoutTransPaid.push(move);
        totalTransRateWithoutTransPaid += parseInt(move.trans_rate);
      }

      // Task 8: Identify moves without g_form value
      if (!move.g_form) {
        movesWithoutGForm.push(move);
      }

      // Task 9: Identify moves with g_form_exp value and calculate remaining time
      if (move.g_form_exp) {
        movesWithGFormExp.push(move);
        const currentDate = new Date();
        const expirationDate = new Date(move.g_form_exp);
        const remainingTime = expirationDate.getTime() - currentDate.getTime();
        totalRemainingTimeGFormExp += remainingTime;
      }

      // Task 10: Count moves by customer
      if (!movesByCustomer[move.customer]) {
        movesByCustomer[move.customer] = 1;
      } else {
        movesByCustomer[move.customer]++;
      }
    });

    // Send response with calculated statistics
    res.json({
      trucksByStatus,
      totalSalesPerCustomer,
      completeMovesWithInvoiced,
      totalCargoRateAllMoves,
      totalTransRateAllMoves,
      movesWithoutClientPain,
      totalCargoRateWithoutClientPain,
      movesWithoutTransPaid,
      totalTransRateWithoutTransPaid,
      movesWithoutGForm,
      movesWithGFormExp,
      totalRemainingTimeGFormExp,
      movesByCustomer
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  getAllReports
};
