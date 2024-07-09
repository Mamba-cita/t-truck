
const express = require("express");
const router = express.Router();

const {
    getOrders,
    getOrderByID,
    updateOrder,
    deleteOrder,
  } = require("../controllers/ordersController");

  const { protected } = require('../middleware/authMiddleware');


router.route("/").get(getOrders).post(protected);

router
  .route("/:id")
  .get(getOrderByID)
  .put(protected, updateOrder)
  .delete(protected, deleteOrder);

module.exports = router;

