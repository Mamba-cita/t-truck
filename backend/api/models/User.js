const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide a name'],
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: [true, 'please provide a email address'],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("User", UserSchema);
