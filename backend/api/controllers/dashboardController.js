const asyncHandler = require('express-async-handler');
const Moves = require('../models/Moves');
const Fuel = require('../models/Fuel');



const getMoves = asyncHandler(async (req, res) => {
  //get all moves per bellow status 
          // New Order
          // Inbound
          // Outside Loading Point
          // gatein_origin
          // Inside Loading Point
          // gateout_origin
          // On-Journey
          // arr_border
          // Border 1
          // dep_border
          // On-Journey 2
          // arr_dest
          // Outside Offloading Point
          // gatein_des
          // Inside Offloading Point
          // dep_des
          // Empty Return
          // arr_empty_des
          // Inside Empty Return
          // dep_empty_des
          // Completed
          // invoiced
          // Invoiced
          // client_pain
          // Paid
});
const getFuel = asyncHandler(async (req, res) => {});
const getTransporter = asyncHandler(async (req, res) => {});
const getCustomers = asyncHandler(async (req, res) => {});
const getOveralRevenue = asyncHandler(async (req, res) => {});
const getMonthlyRevenue = asyncHandler(async (req, res) => {});
const getDailyRevenue = asyncHandler(async (req, res) => {});
const getNewOrders = asyncHandler(async (req, res) => {});
const getTopCustomers = asyncHandler(async (req, res) => {});
const getTotalFuelRevenue = asyncHandler(async (req, res) => {});
const getEmptyReturns = asyncHandler(async (req, res) => {});
const getTotalAllocatedMovesPerDay = asyncHandler(async (req, res) => {});











 

module.exports = {
};
