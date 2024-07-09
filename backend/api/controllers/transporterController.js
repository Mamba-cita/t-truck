const asyncHandler = require('express-async-handler');
const Transporter = require('../models/Transporter');

// Get all transporters
const getAllTransporters = asyncHandler(async (req, res) => {
  try {
    const transporters = await Transporter.find();
    res.json(transporters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single transporter by ID
const getTransporterById = asyncHandler(async (req, res) => {
  try {
    const transporter = await Transporter.findById(req.params.id);
    if (transporter) {
      res.json(transporter);
    } else {
      res.status(404).json({ message: 'Transporter not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new transporter
const createTransporter = asyncHandler(async (req, res) => {
  const transporter = new Transporter(req.body);
  try {
    const newTransporter = await transporter.save();
    res.status(201).json(newTransporter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a transporter by ID
const updateTransporter = asyncHandler(async (req, res) => {
  try {
    const transporter = await Transporter.findById(req.params.id);
    if (transporter) {
      Object.assign(transporter, req.body);
      const updatedTransporter = await transporter.save();
      res.json(updatedTransporter);
    } else {
      res.status(404).json({ message: 'Transporter not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a transporter by ID
const deleteTransporter = asyncHandler(async (req, res) => {
  try {
    const transporter = await Transporter.findById(req.params.id);
    if (transporter) {
      await transporter.remove();
      res.json({ message: 'Transporter deleted' });
    } else {
      res.status(404).json({ message: 'Transporter not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllTransporters,
  getTransporterById,
  createTransporter,
  updateTransporter,
  deleteTransporter
};
