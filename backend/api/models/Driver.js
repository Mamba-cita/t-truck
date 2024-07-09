const mongoose = require('mongoose');

const DriversSchema = new mongoose.Schema(
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
    dl: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    id_no: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      tel: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", DriversSchema);
