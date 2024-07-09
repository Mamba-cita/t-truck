const express = require("express");
const router = express.Router();

const {
    getAllReports,

} = require("../controllers/reportController");

const { protected } = require('../middleware/authMiddleware');

router.route("/").get(protected,  getAllReports);

module.exports = router;
