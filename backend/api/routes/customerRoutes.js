const express = require("express");
const router = express.Router();

const {
  getCustomers,
  addCustomer,
  updateCustomers,
  deleteCustomers,
  getCustomer,
} = require("../controllers/customerController");

const { protected } = require('../middleware/authMiddleware');


router.route("/").get(protected, getCustomers).post(protected, addCustomer);


router
  .route("/:id")
  .get(getCustomer)
  .put(protected, updateCustomers)
  .delete(protected, deleteCustomers);

module.exports = router;
