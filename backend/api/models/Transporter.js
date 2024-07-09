const mongoose = require('mongoose');

const TransporterSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    city: String,
    state: String,
    country: String,
    phoneNumber: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transporter", TransporterSchema);

