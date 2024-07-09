const asyncHandler = require('express-async-handler');
const Truck = require('../models/Trucks');

// Get all trucks
const getTrucks = asyncHandler(async (req, res) => {
    const trucks = await Truck.find();
    res.status(200).json(trucks);
});

// Get truck by ID
const getTruck = asyncHandler(async (req, res) => {
    const truckId = req.params.id;
    const truck = await Truck.findById(truckId);
    if (!truck) {
        res.status(404); // Not Found
        throw new Error(`Truck with ID ${truckId} not found`);
    }
    res.status(200).json(truck);
});

// Add a new truck
const addTruck = asyncHandler(async (req, res) => {
    const { reg, make, year, value } = req.body;
    if (!reg || !make || !year || !value) {
        res.status(400); // Bad Request
        throw new Error('All fields are required');
    }
    // Check if a truck with the same registration number already exists
    const existingTruck = await Truck.findOne({ reg });
    if (existingTruck) {
        res.status(400); // Bad Request
        throw new Error('Truck with the same registration number already exists');
    }
    // Extract user ID from request
    const userId = req.user._id;
    // Create new truck
    const truck = new Truck({ ...req.body, user: userId });
    const newTruck = await truck.save();
    res.status(201).json(newTruck);
});


// Update truck by ID
const updateTruck = asyncHandler(async (req, res) => {
    const truckId = req.params.id;
    const updateData = req.body;
    const updatedTruck = await Truck.findByIdAndUpdate(truckId, updateData, { new: true });
    if (!updatedTruck) {
        res.status(404); // Not Found
        throw new Error(`Truck with ID ${truckId} not found`);
    }
    res.status(200).json(updatedTruck);
});

// Delete truck by ID
const deleteTruck = asyncHandler(async (req, res) => {
    const truckId = req.params.id;
    const deletedTruck = await Truck.findByIdAndDelete(truckId);
    if (!deletedTruck) {
        res.status(404); // Not Found
        throw new Error(`Truck with ID ${truckId} not found`);
    }
    res.status(200).json({ message: `Truck with ID ${truckId} has been deleted` });
});

module.exports = {
    getTrucks,
    getTruck,
    addTruck,
    updateTruck,
    deleteTruck
};
