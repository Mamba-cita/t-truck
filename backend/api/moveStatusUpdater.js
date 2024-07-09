const Moves = require('../api -1/models/Moves'); 

const updateMoveStatus = async () => {
    try {
      const moves = await Moves.find();
  
      // Iterate through each move
      for (const move of moves) {
        const fields = [
          'arr_origin',
          'gatein_origin',
          'gateout_origin',
          'arr_border',
          'dep_border',
          'arr_dest',
          'gatein_des',
          'dep_des',
          'arr_empty_des',
          'dep_empty_des',
          'invoiced',
          'client_pain'
        ];
  
        let status = null;
  
        for (const field of fields) {
          if (move[field]) {
            // Set the status based on the field
            switch (field) {
              case 'arr_origin':
                status = "Outside Loading Point";
                break;
              case 'gatein_origin':
                status = "Inside Loading Point";
                break;
              case 'gateout_origin':
                status = "On-Journey";
                break;
              case 'arr_border':
                status = "Border 1";
                break;
              case 'dep_border':
                status = "On-Journey 2";
                break;
              case 'arr_dest':
                status = "Outside Offloading Point";
                break;
              case 'gatein_des':
                status = "Inside Offloading Point";
                break;
              case 'dep_des':
                status = "Empty Return";
                break;
              case 'arr_empty_des':
                status = "Inside Empty Return";
                break;
              case 'dep_empty_des':
                status = "Completed";
                break;
              case 'invoiced':
                status = "Invoiced";
                break;
              case 'client_pain':
                status = "Paid";
                break;
            }
          }
        }
  
        if (status) {
          move.Status = status;
          await move.save();
        }
      }
      console.log("Move status update completed.");
    } catch (error) {
      console.error("Error updating move status:", error.message);
    }
  };
  
  module.exports = updateMoveStatus;
  