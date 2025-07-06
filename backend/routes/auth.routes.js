const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.post("/create-account", register);
router.post("/login", login);
router.get("/get-user", authenticateToken, getUser);

module.exports = router;
// This file defines the routes for user authentication, including registration, login, and fetching user details.