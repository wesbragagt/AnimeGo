const path = require("path");
const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const db = require("../models");
// WELCOME
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/landing.html"));
});
// DASHBOARD
router.get("/dashboard", (req, res) => {
    
    res.render("dashboard", {
        name: req.user.name
    });
    
});
module.exports = router;
