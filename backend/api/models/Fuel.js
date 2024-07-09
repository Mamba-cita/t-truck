const mongoose = require('mongoose');

const FuelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    fuelId: {
        type: String,
        unique: true
      },
    truck:String,
    driver: String,
    moveId: String,
    station: String,
    city: String,
    amount_requested: String,
    requested_date: String,
    fuel_type: String,
    fuel_lpo: String,
    amount_fueled: String,
    arr_at_station: String,
    dep_at_station: String,
    Status: {
      type: String,
      default: "Pending"
    }  
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fuel', FuelSchema);
