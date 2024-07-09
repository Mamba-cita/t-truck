const asyncHandler = require('express-async-handler');
const Moves = require('../models/Moves');



const allocateMove = asyncHandler(async (req, res) => {
    try {
      let move = await Moves.findById(req.params.id);
  
      if (!move) {
        return res.status(404).json({ error: 'Move not found' });
      }
  
      // Extract only the allowed fields from the request body
      const { truck, trailer, driver, trans_rate_type, trans_rate, container_number, container_weight, container_size } = req.body;
  
      // Update only the allowed fields
      move.truck = truck || move.truck;
      move.trailer = trailer || move.trailer;
      move.driver = driver || move.driver;
      move.trans_rate_type = trans_rate_type || move.trans_rate_type;
      move.trans_rate = trans_rate || move.trans_rate;
      move.container_number = container_number || move.container_number;
      move.container_weight = container_weight || move.container_weight;
      move.container_size = container_size || move.container_size;
  
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
  


module.exports = {
    allocateMove,
};
