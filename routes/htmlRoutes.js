var path = require("path");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/landing.html"));
    });
    app.get("/watchList", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/watchList.html"));
    });

    app.get("/recommended", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/recommended.html"));
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
