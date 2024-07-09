const asyncHandler = require('express-async-handler');
const Moves = require('../models/Moves');

// Get all orders
const getOrders = asyncHandler(async (req, res) => {
  try {
    const moves = await Moves.find({ truck: { $exists: false } })
      .populate('truck', 'reg')
      .populate('customer', 'name')
      .populate('trailer', 'reg')
      .populate('driver', 'name')
      .exec();

    // Map the populated fields to the desired values
    const formattedMoves = moves.map(move => ({
      ...move._doc,
      customer: move.customer ? move.customer.name : null,
      trailer: move.trailer ? move.trailer.reg : null,
      driver: move.driver ? move.driver.name : null,
      truck: move.truck ? move.truck.reg : null
    }));

    res.json(formattedMoves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  

// Get a single order by ID
const getOrderByID = asyncHandler(async (req, res) => {
  try {
    const move = await Moves.findById(req.params.id)
      .populate('truck')
      .populate('customer')
      .populate('trailer')
      .populate('driver')
      .exec();

    if (move) {
      // Extract field values from populated documents
      const { truck, customer, trailer, driver, ...moveData } = move.toObject();

      // Replace IDs with field values if available
      const populatedMove = {
        ...moveData,
        truck: truck ? truck.reg : null,
        customer: customer ? customer.name : null,
        trailer: trailer ? trailer.reg : null,
        driver: driver ? driver.name : null
      };

      res.json(populatedMove);
    } else {
      res.status(404).json({ message: 'Move not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a order by ID
const updateOrder = asyncHandler(async (req, res) => {
  try {
    const move = await Moves.findById(req.params.id);
    if (move) {
      Object.assign(move, req.body);
      const updatedMove = await move.save();
      res.json(updatedMove);
    } else {
      res.status(404).json({ message: 'Move not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a move by ID
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const move = await Moves.findById(req.params.id);
    if (move) {
      await move.remove();
      res.json({ message: 'Move deleted' });
    } else {
      res.status(404).json({ message: 'Move not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getOrders,
  getOrderByID,
  updateOrder,
  deleteOrder,
};
