const asyncHandler = require('express-async-handler');
const Trailer = require('../models/Trailer');

// Get all trailers
const getAllTrailers = asyncHandler(async (req, res) => {
  try {
    const trailers = await Trailer.find();
    res.json(trailers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single trailer by ID
const getTrailerById = asyncHandler(async (req, res) => {
  try {
    const trailer = await Trailer.findById(req.params.id);
    if (trailer) {
      res.json(trailer);
    } else {
      res.status(404).json({ message: 'Trailer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new trailer
const createTrailer = asyncHandler(async (req, res) => {
  const trailer = new Trailer(req.body);
  try {
    const newTrailer = await trailer.save();
    res.status(201).json(newTrailer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a trailer by ID
const updateTrailer = asyncHandler(async (req, res) => {
  try {
    const trailer = await Trailer.findById(req.params.id);
    if (trailer) {
      Object.assign(trailer, req.body);
      const updatedTrailer = await trailer.save();
      res.json(updatedTrailer);
    } else {
      res.status(404).json({ message: 'Trailer not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a trailer by ID
const deleteTrailer = asyncHandler(async (req, res) => {
  try {
    const trailer = await Trailer.findById(req.params.id);
    if (trailer) {
      await trailer.remove();
      res.json({ message: 'Trailer deleted' });
    } else {
      res.status(404).json({ message: 'Trailer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllTrailers,
  getTrailerById,
  createTrailer,
  updateTrailer,
  deleteTrailer
};
