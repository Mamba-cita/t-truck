const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    expense_type: String,
    description: String,
    request_time: String,
    paid_time: String,
   
    Status: {
      type: String,
      default: "Requested"
    }  
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expenses', ExpensesSchema);
