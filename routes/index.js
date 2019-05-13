const path = require("path");
const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
// WELCOME
router.get("/", (req, res) => res.render("welcome"));
// DASHBOARD
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    console.log("dashboard log");

    res.sendFile(path.join(__dirname, "../public/html/recommended.html"));
});
module.exports = router;
