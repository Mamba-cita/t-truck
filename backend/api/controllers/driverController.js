const asyncHandler = require('express-async-handler');
const Driver = require('../models/Driver');

// Get all drivers
const getAllDrivers = asyncHandler(async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single driver by ID
const getDriverById = asyncHandler(async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new driver
const createDriver = asyncHandler(async (req, res) => {
  // Extract user ID from request
  const userId = req.user._id;
  // Create new driver with user ID
  const driver = new Driver({ ...req.body, user: userId });
  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (err) {
    if (err.name === 'ValidationError') {
      // If the error is due to validation failure, return a 400 Bad Request response
      res.status(400).json({ message: err.message });
    } else {
      // Otherwise, return a 500 Internal Server Error response
      res.status(500).json({ message: 'Server Error' });
    }
  }
});

// Update a driver by ID
const updateDriver = asyncHandler(async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (driver) {
      // Extract user ID from request
      const userId = req.user._id;
      // Assign user ID to the user field
      req.body.user = userId;
      // Update other fields as needed
      Object.assign(driver, req.body);
      const updatedDriver = await driver.save();
      res.json(updatedDriver);
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      // If the error is due to validation failure, return a 400 Bad Request response
      res.status(400).json({ message: err.message });
    } else {
      // Otherwise, return a 500 Internal Server Error response
      res.status(500).json({ message: 'Server Error' });
    }
  }
});


// Delete a driver by ID
const deleteDriver = asyncHandler(async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (driver) {
      await driver.remove();
      res.json({ message: 'Driver deleted' });
    } else {
      res.status(404).json({ message: 'Driver not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
};
