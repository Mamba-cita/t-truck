const mongoose = require('mongoose');

const MovesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    moveId: {
      type: String,
      unique: true
    },
    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Truck',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    trailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trailer',
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
    },
    container_number: String,
    origin: String,
    destination: String,
    cargo_rate: String,
    cargo_rate_type: String,
    trans_rate: String,
    trans_rate_type: String,
    payment_terms: String,
    container_weight: String,
    container_size: String,
    empty_return_des: String,
    g_form: String,
    invoice_no: String,
    g_form_exp: String,
    trans_paid: String,
    client_pain: String,
    invoiced: String,
    arr_origin: String,
    gatein_origin: String,
    gateout_origin: String,
    arr_border: String,
    dep_border: String,
    arr_dest: String,
    gatein_des: String,
    dep_des: String,
    arr_empty_des: String,
    dep_empty_des: String,
    Status: {
      type: String,
      default: "New Order"
    }  
  },
  { timestamps: true }
);

module.exports = mongoose.model('Moves', MovesSchema);
