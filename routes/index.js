const path = require("path");
const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
// WELCOME
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/landing.html"));
});
// DASHBOARD
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/recommended.html"));
});
module.exports = router;
