const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protected } = require('../middleware/authMiddleware');



router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protected, getMe);





module.exports = router;
