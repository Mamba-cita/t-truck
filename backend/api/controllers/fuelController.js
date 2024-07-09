const asyncHandler = require('express-async-handler');
const Fuel = require('../models/Fuel');
const generateFuelId = require('../models/generateFuelId');

// Create a new fuel entry
const createFuelEntry = asyncHandler(async (req, res) => {
    try {
        console.log("backend", req.body);

        // Extract fuelData from the request body
        const { fuelData } = req.body;

        // Validate required fields
        const {
            requested_date,
            amount_requested,
            fuel_type,
            fuel_lpo,
            city,
            station,
            truck,
            driver,
            moveId,
        } = fuelData;
        if (!requested_date || !amount_requested || !fuel_type || !moveId || !station || !city || !truck ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const fuelId = await generateFuelId();

        // Create a new fuel entry with truckId
        const fuelEntry = new Fuel({
            requested_date,
            amount_requested,
            fuel_type,
            fuel_lpo,
            city,
            station,
            moveId,
            truck,
            driver,
            fuelId,
            user: req.user.id,
        });

        // Save the fuel entry
        await fuelEntry.save();

        // Send the newly created fuel entry in the response
        res.status(201).json(fuelEntry);
    } catch (error) {
        // Handle errors
        console.error('Error creating fuel entry:', error);
        res.status(500).json({ message: 'Failed to create fuel entry' });
    }
});

// Get all fuel entries
const getAllFuelEntries = asyncHandler(async (req, res) => {
    try {
        const fuelEntries = await Fuel.find();
        res.status(200).json(fuelEntries);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get a single fuel entry by ID
const getFuelEntryById = asyncHandler(async (req, res) => {
    try {
        const fuelEntry = await Fuel.findById(req.params.id);
        if (!fuelEntry) {
            return res.status(404).json({ error: 'Fuel entry not found' });
        }
        res.status(200).json(fuelEntry);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a fuel entry by ID
const updateFuelEntryById = asyncHandler(async (req, res) => {
    const updatedFuelEntry = await Fuel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFuelEntry) {
        return res.status(404).json({ message: 'Fuel entry not found' });
    }
    res.status(200).json(updatedFuelEntry);
});

// Delete a fuel entry by ID
const deleteFuelEntryById = asyncHandler(async (req, res) => {
    const deletedFuelEntry = await Fuel.findByIdAndDelete(req.params.id);
    if (!deletedFuelEntry) {
        return res.status(404).json({ message: 'Fuel entry not found' });
    }
    res.status(200).json({ message: 'Fuel entry deleted successfully' });
});

module.exports = {
    createFuelEntry,
    getAllFuelEntries,
    getFuelEntryById,
    updateFuelEntryById,
    deleteFuelEntryById
};
