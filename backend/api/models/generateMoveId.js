// generateMoveId.js

const Moves = require('./Moves');

// Function to generate moveId
async function generateMoveId() {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

    // Find the last move ID from the database
    const lastMove = await Moves.findOne({}, {}, { sort: { 'createdAt': -1 } });

    // If no moves exist, start with 001
    let lastMoveNumber = 0;
    if (lastMove) {
      const lastMoveId = lastMove.moveId;
      if (lastMoveId) {
        const lastMoveNumberStr = lastMoveId.split('/').pop(); // Extract the last part (move number) of the move ID
        lastMoveNumber = parseInt(lastMoveNumberStr);
      }
    }

    // Increment the last move number and generate the new move ID
    const newMoveNumber = lastMoveNumber + 1;
    const newMoveNumberStr = newMoveNumber.toString().padStart(3, '0'); // Ensure 3-digit format
    const moveId = `TSM${year}/${month}/${newMoveNumberStr}`;
    
    return moveId;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = generateMoveId;
