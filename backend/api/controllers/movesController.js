const asyncHandler = require("express-async-handler");
const Moves = require("../models/Moves");
const generateMoveId = require("../models/generateMoveId");

// Get all moves with populated fields
const getAllMoves = asyncHandler(async (req, res) => {
  try {
    const moves = await Moves.find()
      .populate("truck", "reg")
      .populate("customer", "name")
      .populate("trailer", "reg")
      .populate("driver", "name")
      .exec();

    // Filter out moves with no truck values
    const filteredMoves = moves.filter((move) => move.truck);

    // Format moves and populate fields
    const formattedMoves = filteredMoves.map((move) => ({
      ...move._doc,
      truck: move.truck ? move.truck.reg : null,
      customer: move.customer ? move.customer.name : null,
      trailer: move.trailer ? move.trailer.reg : null,
      driver: move.driver ? move.driver.name : null,
    }));

    res.json(formattedMoves);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get a single move by ID
const getMoveById = asyncHandler(async (req, res) => {
  try {
    const move = await Moves.findById(req.params.id)
      .populate("truck", "reg")
      .populate("customer", "name email")
      .populate("trailer", "reg")
      .populate("driver", "name tel")
      .exec();

    if (!move) {
      return res.status(404).json({ error: "Move not found" });
    }

    const { truck, customer, trailer, driver, ...moveData } = move.toObject();
    const populatedMove = {
      ...moveData,
      truck: truck ? truck.reg : null,
      customer: customer
        ? { name: customer.name, email: customer.email }
        : null,
      trailer: trailer ? trailer.reg : null,
      driver: driver ? { name: driver.name, tel: driver.tel } : null,
    };

    res.json(populatedMove);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new move or multiple moves based on the number of trucks

const createMove = async (req, res) => {
  try {
    const {
      customer,
      origin,
      destination,
      cargo_rate,
      cargo_rate_type,
      number_trucks,
      user,
    } = req.body;

    const createdMoves = [];

    // Create moves for each truck
    for (let i = 0; i < number_trucks; i++) {
      // Generate a unique moveId for each move
      const moveId = await generateMoveId();
      // Create a new move document
      const newMove = new Moves({
        moveId,
        customer,
        origin,
        destination,
        cargo_rate,
        cargo_rate_type,
        user,
      });
      const savedMove = await newMove.save();

      createdMoves.push(savedMove);
    }
    res.status(201).json(createdMoves);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a move by ID
const updateMove = asyncHandler(async (req, res) => {
  try {
    let move = await Moves.findById(req.params.id);

    if (!move) {
      return res.status(404).json({ error: "Move not found" });
    }

    // Merge request body data with existing move data
    Object.assign(move, req.body);

    // Update Status based on provided logic
    if (move.truck && !move.arr_origin) {
      move.Status = "Inbound";
    }

    // Save the updated move to the database
    move = await move.save();

    res.json(move);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a move by ID
const deleteMove = asyncHandler(async (req, res) => {
  try {
    const move = await Moves.findByIdAndDelete(req.params.id);
    if (!move) {
      return res.status(404).json({ error: "Move not found" });
    }
    res.json({ message: "Move deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  getAllMoves,
  getMoveById,
  createMove,
  updateMove,
  deleteMove,
};
