const mongoose = require('mongoose');

const TrailersSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reg: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    make: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    year: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      value: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      weight: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trailer", TrailersSchema);

